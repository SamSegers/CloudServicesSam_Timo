var request = require('supertest');
var expect = require('chai').expect;
var should = require('chai').should();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;

var util = require('../util/index');

mongoose.connect('mongodb://localhost:27017/pubcrawl');

function handleError(req, res, statusCode, message){
    console.log();
    console.log('-------- Error handled --------');
    console.log('Request Params: ' + JSON.stringify(req.params));
    console.log('Request Body: ' + JSON.stringify(req.body));
    console.log('Response sent: Statuscode ' + statusCode + ', Message "' + message + '"');
    console.log('-------- /Error handled --------');
    res.status(statusCode);
    res.json(message);
};

require('../models/race')(mongoose);
require('../models/user')(mongoose);
require('../models/fillTestData')(mongoose, true);

var app = express();
var routes = require('../routes/index');
var races = require('../routes/races')(mongoose, handleError);
app.use('/', routes);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); // log every request to the console
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
	cookie: {
		maxAge: 60*60*1000,
		httpOnly: false
	}
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session

function makeGetRequest(route, statusCode, done){
	request(app)
		.get(route)
		.expect(statusCode)
		.end(function(err, res){
			if(err){ return done(err); }

			done(null, res);
		});
};

function makePostRequest(route, headers, body, statusCode, done){
	request(app)
		/*.post({
			url: route,
			form: body
		})*/
		//.set('Accept', 'application/json')
		.post(route)
		.send(body)
		//.set(headers)
		.expect(statusCode)
		.end(function(err, res){
			if(err) return done(err);

			done(null, res);
		});
};

describe('testing races route', function(){
	describe('authentication', function(){
		it('attempt signup', function(done){
			var data = {username: 'hitchhiker', password: 'password'};

			makePostRequest('/signup2', {
				/*'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': Buffer.byteLength(data)*/
			}, data, 200, function(err, res){
				if(err){ return done(err); }

				//console.log(res.body);
				done();
			});
		});

		/*it('attempt login', function(done){
			makePostRequest('/login', {username: 'hitchhiker', password: 'password'}, 200, function(err, res){
				if(err){ return done(err); }

				console.log(res.body);
				//app.use('/', races);
				done();
			});
		});*/
	});

	/*describe('without params', function(){
		it('should return races', function(done){
			makeGetRequest('/', 200, function(err, res){
				if(err){ return done(err); }

				console.log(res.body[0]);
				expect(res.body[0].constructor === Array);
				//expect(res.body).to.have.property('race');
				//expect(res.body.date).to.not.be.undefined;
				//expect(res.body.date).to.equal(expectedString);
				done();
			});

			makeRequest('/', 200, function(err, res){
				if(err){ return done(err); }

				//console.log(res.body[0].name);
				expect(res.body[0].constructor === Array);
				//expect(res.body).to.have.property('race');
				//expect(res.body.date).to.not.be.undefined;
				//expect(res.body.date).to.equal(expectedString);
				done();
			});

			makeRequest('/', 200, function(err, res){
				if(err){ return done(err); }

				//console.log(res.body[0].name);
				expect(res.body[0].constructor === Array);
				//expect(res.body).to.have.property('race');
				//expect(res.body.date).to.not.be.undefined;
				//expect(res.body.date).to.equal(expectedString);
				done();
			});
		});
	});*/

	/*describe('with invalid params', function(){
		it('should return 400 when date is invalid', function(done){
			makeRequest('/35/2/2000', 400, done);
		});

		it('should return 400 when date is not numeric', function(done){
			makeRequest('/test/me/now', 400, done);
		});
	});

	describe('with valid params', function(){
		it('should return the right date', function(done){
			makeRequest('/10/3/2015', 200, function(err, res){
				if(err){ return done(err); }

				expect(res.body.date).to.not.be.undefined;
				expect(res.body.date).to.equal('10-03-2015');
				done();
			});
		});
	});*/
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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


module.exports = app;
