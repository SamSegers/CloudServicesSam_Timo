var express = require('express');
var router = express.Router();

/* GET races listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

module.exports = function (mongoose, errCallback){
	console.log('Initializing users routing module');
	Race = mongoose.model('Race');
	User = mongoose.model('User');
	handleError = errCallback;
	return router;
};
