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

describe('testing races route', function(){
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

	describe('without params', function(){
		it('should return races', function(done){
			makeGetRequest('/races/', 200, function(err, res){
				if(err) return done(err);

				expect(res.body.constructor === Array);
				expect(res.body[0]).to.have.property('name');
				//expect(res.body.date).to.not.be.undefined;
				//expect(res.body.date).to.equal(expectedString);
				done();
			});

			/*makeRequest('/', 200, function(err, res){
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
			});*/
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
