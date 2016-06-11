//XXX: not in use atm
function init(mongoose){
	console.log('Initializing pub schema');

	var User = mongoose.Schema;
	var data = new User({
		id: {type: String, required: true},
		name: {type: String, required: true},
	});

	return mongoose.model("Pub", data);
}

module.exports = init;
