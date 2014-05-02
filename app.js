/**
 * Module dependencies.
 */

var express = require('express')
    , favicon = require('static-favicon')
    , bodyParser = require('body-parser')
    , methodOverride = require('method-Override')
    , cookieParser = require('cookie-parser')
    , session = require('express-session')
    , logger = require('morgan')
    , routes = require('./routes')
    , http = require('http')
    , path = require('path')
    , passport = require('passport')
    , lessMiddleware = require('less-middleware')
    , errorHandler  = require('errorhandler')
    , ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(favicon(__dirname + '/public/favicon.ico'))
app.use(logger('dev'));

app.use(lessMiddleware(path.join(__dirname, 'public'), { src: __dirname + '/public', debug: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({ secret: 'seed speaking a word seed',  cookie: { httpOnly: false } }));

app.use(passport.initialize());
app.use(passport.session());

// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
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
