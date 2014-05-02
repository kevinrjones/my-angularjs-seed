var data = {
    "seed": [
        {
            "title": "Lorem ipsum",
            "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            "title": "Sed egestas",
            "text": "Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus."
        }
    ]
};

// GET

var SeedServer = function (app, dbName, ensureLoggedIn) {

    var mongo = require("mongoskin");

    var connect = function (dbName, next) {
        var db = mongo.db("localhost/" + dbName, {safe: true});
        next(db);
    }


    var server = {};

    function checkSecurityAndExecute(req, res, callback) {
        if (req.user) {
            callback();
        } else {
            res.send(403);
        }

    }

    app.get('/api/seed', function (req, res) {
        checkSecurityAndExecute(req, res, function () {
            var dateFrom = new Date(Date.parse(req.query.startDate));
            console.log(dateFrom.toUTCString());
            connect(dbName, function (db) {
                db.collection('seed').find().toArray(function (err, items) {
                    res.json([
                        {
                            title: 'some title'
                        },
                        {
                            title: 'some other title'
                        }
                    ]);
                })
            });
        });
    });


//    app.get('/api/seed', function (req, res) {
//        var seed = [];
//        data.seed.forEach(function (seed, i) {
//            seed.push({
//                id: i,
//                title: seed.title,
//                text: seed.text.substr(0, 50) + '...'
//            });
//        });
//        res.json({
//            seed: seed
//        });
//    });

    app.get('/api/seed/:id', function (req, res) {
        checkSecurityAndExecute(req, res, function () {
            var id = req.params.id;
            if (id >= 0 && id < data.seed.length) {
                res.json({
                    seed: data.seed[id]
                });
            } else {
                res.json(false);
            }
        });
    });

    app.post('/api/seed', function (req, res) {
        checkSecurityAndExecute(req, res, function () {
            data.seed.push(req.body);
            res.json(req.body);
        });
    });

    app.put('/api/seed/:id', function (req, res) {
        checkSecurityAndExecute(req, res, function () {

            var id = req.params.id;

            if (id >= 0 && id < data.seed.length) {
                data.seed[id] = req.body;
                res.json(true);
            } else {
                res.json(false);
            }
        });
    });

    app.delete('/api/seed/:id', function (req, res) {
        checkSecurityAndExecute(req, res, function () {

            var id = req.params.id;

            if (id >= 0 && id < data.seed.length) {
                data.seed.splice(id, 1);
                res.json(true);
            } else {
                res.json(false);
            }
        });
    });

    server.app = app;
    return server;
};

module.exports = SeedServer;