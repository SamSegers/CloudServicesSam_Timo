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

// POST

function addRace(req, res){
	var newName = req.params.name;

	Race.find({name: newName}, function(err, data){
		if(data.length==0){
			var race = new Race({
				name: newName,
			});
			race.save(function(err, savedRace){
				if(err){ return handleError(req, res, 500, err); }
				else {
					res.status(201).json(savedRace);
				}
			});
		}else res.status(409).send('race name already in use');
	});
}

// PUT

function updateRaceName(req, res){
	Race.findByIdAndUpdate(
		{_id: req.params.id},
		{name: req.params.name},
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

function updateRaceStartDate(req, res){
	var date = req.params.date.toString();

	if(date.length==8 && util.isNumber(date)){
		var YYYY = date.substr(0, 4);
		var MM = date.substr(4, 2);
		var DD = date.substr(6, 2);

		Race.findByIdAndUpdate(
			{_id: req.params.id},
			{startDate: new Date(YYYY, MM-1, DD)},
			{safe: true, upsert: true},
			function(err, data) {
				if(err) return handleError(req, res, 500, err); 
				else res.status(200).json(data);
			}
		);
	}else res.status(406).send(date+' does not qualify the ISO 1861 standard (YYYYMMDD)');
}

function updateRaceEndDate(req, res){
	var date = req.params.date.toString();

	if(date.length==8 && util.isNumber(date)){
		var YYYY = date.substr(0, 4);
		var MM = date.substr(4, 2);
		var DD = date.substr(6, 2);

		Race.findByIdAndUpdate(
			{_id: req.params.id},
			{endDate: new Date(YYYY, MM-1, DD)},
			{safe: true, upsert: true},
			function(err, data) {
				if(err) return handleError(req, res, 500, err); 
				else res.status(200).json(data);
			}
		);
	}else res.status(406).send(date+' does not qualify the ISO 1861 standard (YYYYMMDD)');
}

function addRaceWaypoint(req, res){
	Race.findByIdAndUpdate(
		req.params.id,
		{$push: {"waypoints": req.params.waypoint}},
		{safe: true, upsert: true},
		function(err, data) {
			res.status(200).json(data);
		}
	);
}

// DELETE

function removeRace(req, res){
	Race.remove(
		{_id: req.params.id},
		function(err, data){
			if(err){ return handleError(req, res, 500, err); }
			res.status(200).send('race successful removed');
		}
	);
}

router.route('/').get(util.isAuthenticated, getRaces);

router.route('/:id')
	.get(util.isAuthenticated, getRaces)
	.delete(util.isAuthenticated, removeRace);

router.route('/:name')
	.post(util.isAuthenticated, addRace)

router.route('/:id/name/:name')
	.put(util.isAuthenticated, updateRaceName)

router.route('/:id/startdate/:date')
	.put(util.isAuthenticated, updateRaceStartDate)

router.route('/:id/enddate/:date')
	.put(util.isAuthenticated, updateRaceEndDate)

router.route('/:id/waypoint/:waypoint')
	.put(util.isAuthenticated, addRaceWaypoint)

module.exports = function (mongoose, errCallback){
	console.log('Initializing races routing module');
	Race = mongoose.model('Race');
	User = mongoose.model('User');
	handleError = errCallback;
	return router;
};