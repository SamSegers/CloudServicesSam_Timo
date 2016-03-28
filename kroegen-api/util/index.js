module.exports = {
	isNumber: function(obj){
		return !isNaN(parseFloat(obj)) 
	},

	isAuthenticated: function(req, res, next) {
		// req.user should exists if the session saved on passport login
		if (req.user) return next();
		res.status(400).send('unauthorized');
	}
};
