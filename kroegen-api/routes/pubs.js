var express = require('express');
var request = require('request');
var router = express.Router();
var Pubs;
var handleError;

function getPubs(req, res){
	request({
		url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyDdCI0Csk73tnbL-nkBIPXu26U6pvb1weA&location=51.697352,5.304787&radius=1000&type=cafe',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
	}, function(error, response, body){
		if(error) console.log(error);
		else res.status(200).send(body);
	});
}

function getPub(req, res){
	var id = req.params.id;
	//TODO better test on id so we only do relevant requests
	if(id!=null){
		request({
			url: 'https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyDdCI0Csk73tnbL-nkBIPXu26U6pvb1weA&placeid='+id,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
		}, function(error, response, body){
			if(error) console.log(error);
			else res.status(200).send(body);
		});
	}
}

router.route('/')
	.get(getPubs);

router.route('/:id')
	.get(getPub);

module.exports = function (mongoose, errCallback){
	console.log('Initializing pubs routing module');
	/*Race = mongoose.model('Race');
	User = mongoose.model('User');*/
	handleError = errCallback;
	return router;
};
