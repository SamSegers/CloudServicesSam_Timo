function init(mongoose){
	console.log('Iniializing Race schema');

	var Race = mongoose.Schema;
	var data = new Race({
		name: {type: String, required: true},
	    startDate: {type: Date, default: Date.now, required: true},
	    endDate: {type: Date, default: (new Date()).getDate()+1, required: true},
		waypoints: [String], // pubs, ids are from the maps API
	});
	mongoose.model("Race", data);
}

module.exports = init;
