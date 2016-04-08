var express = require('express');
var router = express.Router();
var util = require('../util/index');
var Race;
var User;
var handleError;

function getUsers(req, res){
	var query = {};
	if(req.params.id) query._id = req.params.id;
	if(req.params.name) query.username = req.params.name;

	var result = User.find(query);

	result.exec(function(err, data){
		if(err) return handleError(req, res, 500, err);

		if(req.params.id) data = data[0];
		res.status(201).json(data);
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
	var query = {};
	if(req.params.id) query._id = req.params.id;
	if(req.params.name) query.username = req.params.name;

	User.update(
		query,
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
	var query = {};
	if(req.params.id) query._id = req.params.id;
	if(req.params.name) query.username = req.params.name;

	User.update(
		query,
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
	var query = {};
	if(req.params.id) query._id = req.params.id;
	if(req.params.name) query.username = req.params.name;

	User.update(
		query,
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
	var query = {};
	if(req.params.id) query._id = req.params.id;
	if(req.params.name) query.username = req.params.name;

	User.update(
		query,
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
	var query = {};
	if(req.params.id) query._id = req.params.id;
	if(req.params.name) query.username = req.params.name;

	User.update(
		query,
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
	var query = {};
	if(req.params.id) query._id = req.params.id;
	if(req.params.name) query.username = req.params.name;

	User.remove(
		query,
		function(err, data){
			if(err){ return handleError(req, res, 500, err); }
			res.status(200).send('user successful removed');
		}
	);
}

function getPubs(req, res){
	var query = {};
	if(req.params.id) query._id = req.params.id;
	if(req.params.name) query.username = req.params.name;

	User.findOne(query, {_id: 0, pub: 1}, function(err, data){
		if(err) res.status(400).json(err); 		
		else res.status(200).json(data);
	});
}

function addPub(req, res){
	var pubObj = {};
	if(req.params.pubId) pubObj.id = req.params.pubId;
	if(req.params.pubName) pubObj.name = req.params.pubName;

	User.findByIdAndUpdate(
		req.user.id,
		{$push: {'pub': pubObj}},
		{safe: true, upsert: true},
		function(err, data) {
			if(err) res.status(400).send(err);
			else res.status(200).json(data);
		}
	);
}

function getRaces(req, res){
	User.find({_id: req.user.id}, {_id: 0, race: 1}, function(err, data){
		if(err) res.status(400).json(err); 		
		else res.status(200).json(data);
	});
}

function getRacesCreated(req, res){
	Race.find({authorId: req.user.id}, function(err, data){
		if(err) res.status(400).json(err); 		
		else res.status(200).json(data);
	});
}

function tagPub(req, res){
	var query;
	query._id = req.user.id;
	if(req.params.raceId) query['race.id'] = req.params.raceId;
	else if(req.params.raceName) query['race.name'] = req.params.raceName;

	var pubVal;
	if(req.params.pubId) pubVal = req.params.pubId;
	else if(req.params.pubName) pubVal = req.params.pubName;

	User.update(
		query,
		{'$push': {'race.$.tagged': pubVal}},
		{safe: true, upsert: true},
		function(err, data) {
			if(err) res.status(400).json(err); 		
			else res.status(200).json(data);
		}
	);
}

function untagPub(req, res){
	var query;
	query._id = req.user.id;
	if(req.params.raceId) query['race.id'] = req.params.raceId;
	else if(req.params.raceName) query['race.name'] = req.params.raceName;

	var pubVal;
	if(req.params.pubId) pubVal = req.params.pubId;
	else if(req.params.pubName) pubVal = req.params.pubName;

	User.update(
		query,
		{$pull: {'race.$.tagged': pubVal}},
		{safe: true, upsert: true},
		function(err, data) {
			if(err) res.status(400).json(err); 		
			else res.status(200).json(data);
		}
	);
}

function getTags(req, res){
	var query = {};
	query._id = req.user.id;
	if(req.params.raceId) query['race.id'] = req.params.raceId;
	else if(req.params.raceName) query['race.name'] = req.params.raceName;

	User.find(
		query,
		//{_id: 0, race: 0, 'race.$.tagged': 1},
		function(err, data){
			if(err) res.status(400).json(err); 		
			else{
				var tags = [];
				data = data[0].race;
				data.forEach(function(entry){
					if(req.params.raceId && entry.id==req.params.raceId
					|| req.params.raceName && entry.name==req.params.raceName)
						tags = entry.tagged;	
				});
				res.status(200).json(tags);
			}
		}
	);
}

router.route('/').get(getUsers);

router.route('/pubs')
	.get(util.isAuthenticated, getPubs);

router.route('/pubs/:pubId/name/:pubName')
	.put(addPub);

router.route('/races')
	.get(util.isAuthenticated, getRaces);

router.route('/racescreated')
	.get(util.isAuthenticated, getRacesCreated);

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

router.route('/race/:raceId/pub/:pubId/tag')
	.put(util.isAuthenticated, tagPub)

router.route('/race/:raceId/pub/:pubId/untag')
	.put(util.isAuthenticated, untagPub)

router.route('/race/:raceId/tags')
	.get(getTags)

router.route('/name/:name')
	.get(getUsers)
	.delete(removeUser);

router.route('/name/:name/username/:username')
	.put(updateUsername)

router.route('/name/:name/firstname/:firstname')
	.put(updateFirstname)

router.route('/name/:name/lastname/:lastname')
	.put(updateLastname)

router.route('/name/:name/country/:country')
	.put(updateCountry)

router.route('/name/:name/birthdate/:birthdate')
	.put(updateBirthdate);

router.route('/race/name/:raceName/pub/name/:pubName/tag')
	.put(util.isAuthenticated, tagPub)

router.route('/race/name/:raceName/pub/name/:pubName/untag')
	.put(util.isAuthenticated, untagPub)

router.route('/race/name/:raceName/tags')
	.get(util.isAuthenticated, getTags)

module.exports = function (mongoose, errCallback){
	console.log('Initializing users routing module');
	Race = mongoose.model('Race');
	User = mongoose.model('User');
	handleError = errCallback;
	return router;
};
