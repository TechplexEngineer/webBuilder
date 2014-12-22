

var express = require('express.io');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan'); //not super clear what this does for us?
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var console = require('better-console');

var mongo = require('mongodb');
var monk = require('monk');
var config = require('./config.js')

var db = monk(config.db.getConnStr());
console.log(config.db.getConnStr());

var app = express();
app.http().io()

//add "view globals" to all templates
app.locals = config.global

// Add session support
// app.use(express.session({secret: ':7b>64/`NJ7#Vsk.r3+kv>6%g7]%U='}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});
app.db = db;

//autoload routes from the routes directory
//first parameter is routes directory,
//second parameter boolean (recursive or not)
app.use(require('expressjs.routes.autoload')(path.join(__dirname, './routes'), false));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// -- Error Handlers --

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', config.port);

var server = app.listen(app.get('port'), function() {
  console.info('Express.io server listening on port ' + server.address().port);
  console.info('Server running in %s mode.',app.get('env'));
});

