function init(mongoose){
	console.log('Iniializing user schema');

	var User = mongoose.Schema;
	var data = new User({
		username: {type: String, required: true, unique: true},
		firstname: {type: String, required: true},
	    lastname: {type: String, required: true},
		birthdate: {type: Date, default: Date.now},
		country: {type: String, default: 'NL'},
		race: [{
			id: {type: String, required: true}, 
			tagged: [String] // get waypoints from the race id, add id as a tag
		}] 
	});
	mongoose.model("User", data);
}

module.exports = init;
