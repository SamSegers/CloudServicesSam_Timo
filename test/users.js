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

function makePostRequest(route, headers, body, statusCode, done){
	request(app)
		.post(route)
		.send(body)
		.set(headers)
		.expect(statusCode)
		.end(function(err, res){
			if(err) return done(err);

			done(null, res);
		})
	;
};

describe('testing users', function(){
	describe('authentication', function(){
		var data = {
			username: 'a', 
			password: 'b'
		};

		it('attempt login', function(done){
			makePostRequest(
				'/login', {
					'Content-Type': 'application/x-www-form-urlencoded'
				}, 
				data, 
				200, 
				function(err, res){
					if(err) return done(err);

					expect(res.body.username).to.equal('a');
					expect(res.body).to.be.instanceof(Object);
					done();
				}
			);
		});

		it('attempt signup', function(done){
			makePostRequest(
				'/signup', {
					'Content-Type': 'application/x-www-form-urlencoded'
				}, 
				data, 
				400, 
				function(err, res){
					if(err) return done(err);

					//expect(res.body.username).to.equal('a');
					//expect(res.body).to.be.instanceof(Object);
					done();
				}
			);
		});

		it('attempt logout', function(done){
			makeGetRequest('/logout', 200, function(err, res){
				if(err) return done(err);

				done();
			});
		});
	});

	describe('testing users route', function(){
		it('should return users', function(done){
			makeGetRequest('/users/', 201, function(err, res){
				if(err) return done(err);

				//console.log(res.body);
				//var object = JSON.parse(res.body)
				expect(res.body).to.be.instanceof(Array);
				
				done();
			});
		});

		it('should return hitchhiker', function(done){
			makeGetRequest('/users/5744acf9d185b7bc2653ba2e', 201, function(err, res){
				if(err) return done(err);

				expect(res.body).to.be.instanceof(Object);
				expect(res.body.username).to.equal('hitchhiker');
				
				done();
			});
		});

		it('should return user pubs', function(done){
			makeGetRequest('/users/pubs', 400, function(err, res){
				if(err) return done(err);

				//var object = JSON.parse(res.body)
				//expect(res.body).to.be.instanceof(Array);
				
				done();
			});
		});

		it('should return user created races', function(done){
			makeGetRequest('/users/racescreated', 400, function(err, res){
				if(err) return done(err);

				//var object = JSON.parse(res.body)
				//expect(res.body).to.be.instanceof(Array);
				
				done();
			});
		});
	});
});
