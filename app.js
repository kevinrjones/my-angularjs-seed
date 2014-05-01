/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , http = require('http')
    , path = require('path')
    , passport = require('passport')
    , ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.favicon());
app.use(express.logger('dev'));

app.use(require('less-middleware')({ src: __dirname + '/public', debug: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({ secret: 'time speaking a word sheet',  cookie: { httpOnly: false } }));

app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}


app.get('/partials/:name', routes.partials);

var dbName = "Seed";

require("./routes/seed_api")(app, dbName, ensureLoggedIn);
require("./infrastructure/authentication")(app, dbName, passport);

app.get('/*', function(req, res, next){
    console.log("get /*: ", req.url)
    if(req.user) {
        role = req.user.role;
        username = req.user.username;
        res.cookie('user', JSON.stringify({'id': req.user.id}), { httpOnly: false } );
    } else {
        console.log("no user");
        res.clearCookie("user");
    }
    next();
}, routes.index, ensureLoggedIn('/login'));

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
