var request = require('supertest');
var expect = require('chai').expect;
var should = require('chai').should();

var app = require('express')();
var races = require('../routes/races');
app.use('/', races);

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
			makeRequest('/races/', 200, function(err, res){
				if(err){ return done(err); }

				console.log(res.body);
				/*expect(res.body).to.have.property('race');
				expect(res.body.date).to.not.be.undefined;
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

