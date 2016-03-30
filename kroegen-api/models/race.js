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
	    startDate: {type: Date, default: tomorrow, required: true},
	    endDate: {type: Date, default: dayAfterTomorrow, required: true},
		waypoints: [String], // pubs, ids are from the maps API
	});
	mongoose.model("Race", data);
}

module.exports = init;
