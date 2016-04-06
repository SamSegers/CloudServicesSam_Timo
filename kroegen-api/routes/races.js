var express = require('express');
var passport = require('passport');
var router = express.Router();
var util = require('../util/index');
var Race;
var User;
var handleError;

// GET

function getRaces(req, res){
	var query = {};
	if(req.params.id) query._id = req.params.id;

	var result = Race.find(query);

	result.exec(function(err, data){
		if(err) return handleError(req, res, 500, err);

		if(req.params.id) data = data[0];
		res.json(data);
	});
}

function getUsers(req, res){
	User.find({'race.id': req.params.id}, function(err, data){
		if(err){ return handleError(req, res, 500, err); }
		else res.status(200).json(data);
	});
}

// POST

function addRace(req, res){
	var newName = req.params.name;

	Race.find({name: newName}, function(err, data){
		if(data.length==0){
			var race = new Race({
				name: newName,
				authorId: req.user.id
			});
			race.save(function(err, savedRace){
				if(err){ return handleError(req, res, 500, err); }
				else{
					User.findByIdAndUpdate(
						{_id: req.user.id},
						{$push: {race: {id: savedRace.id, tagged: []}}},
						{safe: true, upsert: true},
						function(err, data) {
							if(err) return handleError(req, res, 500, err); 
							else res.status(201).json(savedRace);
						}
					);
				}
			});
		}else res.status(409).send('race name already in use');
	});
}

// PUT

function updateRace(req, res){
	Race.findByIdAndUpdate(
		{_id: req.params.id},
		{
			name: req.body.name,
			pubs: req.body.pubs
		},
		{safe: true, upsert: true},
		function(err, data) {
			if(err){ return handleError(req, res, 500, err); }
			else res.status(200).json(data);
		}
	);
}

function updateRaceName(req, res){
	Race.findByIdAndUpdate(
		{_id: req.params.id},
		{name: req.params.name},
		{safe: true, upsert: true},
		function(err, data) {
			if(err){ return handleError(req, res, 500, err); }
			else res.status(200).json(data);
		}
	);
}

function addRacePub(req, res){
	Race.findByIdAndUpdate(
		req.params.id,
		{$push: {"pubs": {"id": req.params.pubId, "name": req.params.pubName}}},
		{safe: true, upsert: true},
		function(err, data) {
			res.status(200).json(data);
		}
	);
}

function joinRace(req, res){
	User.findByIdAndUpdate(
		{_id: req.user.id},
		{$push: {race: {id: req.params.id, tagged: []}}},
		{safe: true, upsert: true},
		function(err, data) {
			if(err) return handleError(req, res, 500, err); 
			else res.status(201).json(data);
		}
	);
}

function leaveRace(req, res){
	User.findByIdAndUpdate(
		{_id: req.user.id},
		{$pull: {race: {id: req.params.id}}},
		{safe: true, upsert: true},
		function(err, data) {
			console.log(err);
			if(err) return handleError(req, res, 500, err); 
			else res.status(201).json(data);
		}
	);
}

function updateRaceStartDate(req, res){
	//var date = req.params.date.toString();
	var date = Date.now();
	console.log(date);

	Race.findByIdAndUpdate(
		{_id: req.params.id},
		{startDate: date},
		{safe: true, upsert: true},
		function(err, data) {
			if(err) return handleError(req, res, 500, err); 
			else res.status(200).json(data);
		}
	);
}

function updateRaceEndDate(req, res){
	//var date = req.params.date.toString();
	var date = Date.now();
	//if(date.length==8 && util.isNumber(date)){
	//	var YYYY = date.substr(0, 4);
	//	var MM = date.substr(4, 2);
	//	var DD = date.substr(6, 2);

	Race.findByIdAndUpdate(
		{_id: req.params.id},
		{endDate: date},
		//{endDate: new Date(YYYY, MM-1, DD)},
		{safe: true, upsert: true},
		function(err, data) {
			if(err) return handleError(req, res, 500, err); 
			else res.status(200).json(data);
		}
	);
	//}else res.status(406).send(date+' does not qualify the ISO 1861 standard (YYYYMMDD)');
}

// DELETE

function removeRace(req, res){
	Race.remove(
		{_id: req.params.id},
		function(err, data){
			if(err){ return handleError(req, res, 500, err); }
			res.status(200).send('race successfully removed');
		}
	);
}

router.route('/').get(getRaces);

router.route('/:id')
	.get(getRaces)
	.delete(util.isAuthenticated, removeRace);

router.route('/:id/update') //TODO :name inside the body of the request rathen than as a parameter
	.put(util.isAuthenticated, updateRace);

router.route('/:id/users')
	.get(getUsers)

router.route('/:id/join')
	.put(util.isAuthenticated, joinRace)

router.route('/:id/leave')
	.put(util.isAuthenticated, leaveRace)

router.route('/new/:name')
	.post(util.isAuthenticated, addRace)

router.route('/:id/name/:name')
	.put(util.isAuthenticated, updateRaceName)

router.route('/:id/start')
	.put(util.isAuthenticated, updateRaceStartDate)

router.route('/:id/end')
	.put(util.isAuthenticated, updateRaceEndDate)

router.route('/:id/pub/:pubId/name/:pubName')
	.put(util.isAuthenticated, addRacePub)

module.exports = function (mongoose, errCallback){
	console.log('Initializing races routing module');
	Race = mongoose.model('Race');
	User = mongoose.model('User');
	handleError = errCallback;
	return router;
};
