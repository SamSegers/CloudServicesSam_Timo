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
require('../models/fillTestData')(mongoose);

var app = express();
var routes = require('../routes/index');
var users = require('../routes/users')(mongoose, handleError);
app.use('/', routes);
app.use('/', users);

function makeRequest(route, statusCode, done){
	request(app)
		.get(route)
		.expect(statusCode)
		.end(function(err, res){
			if(err){ return done(err); }

			done(null, res);
		});
};

describe('testing users route',function(){
	describe('without params',function(){
		it('should return users',function(done){
			makeRequest('/',200,function(err,res){
				if(err){return done(err);}
				expect(res.body).to.have.property('user');
				
				done();
			});
		});
	});
});

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
