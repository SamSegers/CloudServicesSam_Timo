var express = require('express');
var router = express.Router();
var util = require('../util/index');
var Race;
var User;
var handleError;

function getUsers(req, res){
	var query = {};
	if(req.params.id) query._id = req.params.id;

	var result = User.find(query);

	result.exec(function(err, data){
		if(err) return handleError(req, res, 500, err);

		if(req.params.id) data = data[0];
		res.json(data);
		res.status(201);
	});
}

function addUser(req, res){
	var newUsername = req.params.username;

	User.find({username: newUsername}, function(err, data){
		if(data.length==0){
			var user = new User({
				username: newUsername,
				firstname: req.params.firstname,
				lastname: req.params.lastname
			});
			user.save(function(err, savedUser){
				if(err){ return handleError(req, res, 500, err); }
				else {
					res.status(201);
					res.json(savedUser);
				}
			});
		}else res.status(409).send('username already in use');
	});
}

function updateUsername(req, res){
	User.findByIdAndUpdate(
		{_id: req.params.id},
		{username: req.params.username},
		{safe: true, upsert: true},
		function(err, data) {
			if(err){ return handleError(req, res, 500, err); }
			else {
				res.status(200);
				res.json(data);
			}
		}
	);
}

function updateFirstname(req, res){
	User.findByIdAndUpdate(
		{_id: req.params.id},
		{firstname: req.params.firstname},
		{safe: true, upsert: true},
		function(err, data) {
			if(err){ return handleError(req, res, 500, err); }
			else {
				res.status(200);
				res.json(data);
			}
		}
	);
}

function updateLastname(req, res){
	User.findByIdAndUpdate(
		{_id: req.params.id},
		{lastname: req.params.lastname},
		{safe: true, upsert: true},
		function(err, data) {
			if(err){ return handleError(req, res, 500, err); }
			else {
				res.status(200);
				res.json(data);
			}
		}
	);
}

function updateCountry(req, res){
	User.findByIdAndUpdate(
		{_id: req.params.id},
		{country: req.params.country},
		{safe: true, upsert: true},
		function(err, data) {
			if(err){ return handleError(req, res, 500, err); }
			else {
				res.status(200);
				res.json(data);
			}
		}
	);
}

function updateBirthdate(req, res){
	User.findByIdAndUpdate(
		{_id: req.params.id},
		{birthdate: req.params.birthdate},
		{safe: true, upsert: true},
		function(err, data) {
			if(err){ return handleError(req, res, 500, err); }
			else {
				res.status(200);
				res.json(data);
			}
		}
	);
}

function removeUser(req, res){
	User.remove(
		{_id: req.params.id},
		function(err, data){
			if(err){ return handleError(req, res, 500, err); }
			res.status(200).send('user successful removed');
		}
	);
}

function getPubs(req, res){
	User.find({_id: req.user.id}, {_id: 0, pub: 1}, function(err, data){
		if(err) res.status(400).json(err); 		
		else res.status(200).json(data);
	});
}

function addPub(req, res){
	User.findByIdAndUpdate(
		req.user.id,
		{$push: {'pub': req.params.pubId}},
		{safe: true, upsert: true},
		function(err, data) {
			if(err) res.status(400).send(err);
			else res.status(200).json(data);
		}
	);
}

router.route('/').get(getUsers);

router.route('/pubs')
	.get(util.isAuthenticated, getPubs);

router.route('/pubs/:pubId')
	.put(addPub);

router.route('/:id')
	.get(getUsers)
	.delete(removeUser);

// only insert for users, country and birthdate need to be added through PUT
router.route('/:username/firstname/:firstname/lastname/:lastname')
	.post(addUser);

router.route('/:id/username/:username')
	.put(updateUsername)

router.route('/:id/firstname/:firstname')
	.put(updateFirstname)

router.route('/:id/lastname/:lastname')
	.put(updateLastname)

router.route('/:id/country/:country')
	.put(updateCountry)

router.route('/:id/birthdate/:birthdate')
	.put(updateBirthdate);

//TODO races tagging

module.exports = function (mongoose, errCallback){
	console.log('Initializing users routing module');
	Race = mongoose.model('Race');
	User = mongoose.model('User');
	handleError = errCallback;
	return router;
};
