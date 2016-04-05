function init(mongoose){
	console.log('Iniializing Race schema');

	// thinking of using ISO 8601

	var tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);

	var dayAfterTomorrow = new Date();
	dayAfterTomorrow.setDate(tomorrow.getDate() + 1);

	var Race = mongoose.Schema;
	var data = new Race({
		name: {type: String, required: true},
		authorId: {type: String, required: true},
	    startDate: {type: Date, required: false},
	    endDate: {type: Date, required: false},
		pubs: [{ // pubs, ids are from the google API, TODO: use Pub model
			id: {type: String, required: true},
			name: String
		}], 
	});
	mongoose.model("Race", data);
}

module.exports = init;
