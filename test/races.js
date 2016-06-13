var app = require('../app.js');
var request = require('supertest');
var expect = require('chai').expect;
var should = require('chai').should();

function makeGetRequest(route, statusCode, done){
	request(app)
		.get(route)
		.expect(statusCode)
		.end(function(err, res){
			if(err) return done(err);

			done(null, res);
		})
	;
};

describe('testing races route', function(){
	describe('without params', function(){
		it('should return races', function(done){
			makeGetRequest('/races/', 200, function(err, res){
				if(err) return done(err);

				expect(res.body.constructor === Array);
				expect(res.body[0]).to.have.property('name');

				done();
			});
		});

		it('should return race', function(done){
			makeGetRequest('/races/5744acf9d185b7bc2653ba2d', 200, function(err, res){
				if(err) return done(err);

				expect(res.body).to.be.instanceof(Object);
				expect(res.body.name).to.equal('pilgrimage');

				done();
			});
		});

		it('should return users of race', function(done){
			makeGetRequest('/races/5744acf9d185b7bc2653ba2d/users', 400, function(err, res){
				if(err) return done(err);

				//expect(res.body).to.be.instanceof(Array);

				done();
			});
		});

		it('should return race tags', function(done){
			makeGetRequest('/races/5744acf9d185b7bc2653ba2d/tags', 404, function(err, res){
				if(err) return done(err);

				//expect(res.body).to.be.instanceof(Array);
				
				done();
			});
		});
	});
});
