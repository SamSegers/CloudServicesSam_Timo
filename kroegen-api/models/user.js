function init(mongoose){
	console.log('Initializing user schema');

	var User = mongoose.Schema;
	var data = new User({
		username: {type: String, required: true, unique: true},
		password: String,
		//password: {type: String, required: true},
		//firstname: {type: String, required: true}, TODO
	    //lastname: {type: String, required: true},
		birthdate: {type: Date, default: Date.now},
		country: {type: String, default: 'NL'},
		race: [{
			id: {type: String, required: true}, 
			tagged: [String] // get waypoints from the race id, add id as a tag
		}]
	});

	var passportLocalMongoose = require('passport-local-mongoose');
	data.plugin(passportLocalMongoose);

	return mongoose.model("User", data);
}

module.exports = init;

/*var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: String,
    password: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);*/
