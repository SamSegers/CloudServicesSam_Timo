var request = require('supertest');
var expect = require('chai').expect;
var should = require('chai').should();
var mongoose = require('mongoose');

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

var app = require('express')();
var races = require('../routes/races')(mongoose, handleError);;
app.use('/', races);

require('../models/race')(mongoose);
require('../models/user')(mongoose);
require('../models/fillTestData')(mongoose);

function makeRequest(route, statusCode, done){
	request(app)
		.get(route)
		.expect(statusCode)
		.end(function(err, res){
			if(err){ return done(err); }

			done(null, res);
		});
};

describe('testing races route', function(){
	describe('without params', function(){
		it('should return races', function(done){
			makeRequest('/', 200, function(err, res){
				if(err){ return done(err); }

				expect(res.body).to.have.property('race');
				/*expect(res.body.date).to.not.be.undefined;
				expect(res.body.date).to.equal(expectedString);*/
				done();
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

