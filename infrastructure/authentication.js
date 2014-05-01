var Authentication = function (app, dbName, passport) {

    var bcrypt = require('bcrypt-nodejs');

    console.log("authenticate");
    var mongo = require("mongoskin"),
        LocalStrategy = require('passport-local').Strategy;

    var connect = function (dbName, next) {
        var db = mongo.db("localhost/" + dbName, {safe: true});
        next(db);
    }


    var server = {};

//    app.post('/login', passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/login' }));
    app.post('/login', function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.send(401);
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.send(200);
            });
        })(req, res, next);
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.clearCookie("user");
        res.redirect('/');
    });

    app.post('/register', function (req, res, next) {
        connect(dbName, function (db) {
            var collection = db.collection('users');
            db.collection('users').findOne({email: req.body.email}, function (err, item) {
                if (item == null) {
                    collection.find().toArray(function (err, users) {
                        var lastId = 0;
                        if (users && users.length > 0) {
                            lastId = users[users.length - 1].id;
                        }
                        var newId = lastId + 1;
                        bcrypt.genSalt(10, function (err, salt) {
                            bcrypt.hash(req.body.password, salt, null, function (err, hash) {
                                collection.insert({id: newId, email: req.body.email, password: hash}, function (err, result) {
                                });
                                return res.send(200);
                            });
                        });
                    })
                } else {
                    return res.send(409);
                }
            });
        });
    });

    function findById(id, fn) {
        connect(dbName, function (db) {
            db.collection('users').findOne({id: id}, function (err, item) {
                return fn(null, item);
            });
        });
    }

    function findByEmail(email, fn) {
        connect(dbName, function (db) {
            db.collection('users').findOne({email: email}, function (err, item) {
                console.log(item);
                user = fn(null, item);
                return user;
            });
        });
    }

    // Passport session setup.
    //   To support persistent login sessions, Passport needs to be able to
    //   serialize users into and deserialize users out of the session.  Typically,
    //   this will be as simple as storing the user ID when serializing, and finding
    //   the user by ID when deserializing.
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        findById(id, function (err, user) {
            done(err, user);
        });
    });

    // Use the LocalStrategy within Passport.
    //   Strategies in passport require a `verify` function, which accept
    //   credentials (in this case, a username and password), and invoke a callback
    //   with a user object.  In the real world, this would query a database;
    //   however, in this example we are using a baked-in set of users.
    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        function (email, password, done) {
            // Find the user by username.  If there is no user with the given
            // username, or the password is not correct, set the user to `false` to
            // indicate failure and set a flash message.  Otherwise, return the
            // authenticated `user`.

//            findByUsername(username, function (err, user) {
            findByEmail(email, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, { message: 'Unknown user ' + email });
                }

                if (!bcrypt.compareSync(password, user.password)) {
                    return done(null, false, { message: 'Invalid password' });
                }
                return done(null, user);
            })
        }
    ));
}

module.exports = Authentication;