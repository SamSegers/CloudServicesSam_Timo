var app = require('../app.js');
var request = require('supertest');
var expect = require('chai').expect;
var should = require('chai').should();

function makeRequest(route, statusCode, done){
	request(app)
		.get(route)
		.expect(statusCode)
		.end(function(err, res){
			if(err) return done(err);

			done(null, res);
		})
	;
};

describe('testing pubs route', function(){
	it('should return pubs', function(done){
		makeRequest('/pubs/', 200, function(err, res){
			if(err) return done(err);

			var object = JSON.parse(res.body)
			expect(object.results).to.be.instanceof(Array);
			
			done();
		});
	});

	it("should return 'Cafe de Unie'", function(done){
		makeRequest('/pubs/ChIJM8kGb1juxkcRkAubH2-Anhw', 200, function(err, res){
			if(err) return done(err);

			var object = JSON.parse(res.body)
			expect(object.result.name).to.equal('Cafe de Unie');
			
			done();
		});
	});
});
