var Race, User;

function saveCallback(err){
	if(err){
		console.log('Fill testdata failed, reason: %s', err)
	}
};


function fillTestRace(callback){
	var testData = [
		{
			name: 'pilgrimage',
			waypoints: ['1', '2', '3', '4']
		}
	];

	Race.find({}, function(err, data){
		if(data.length == 0){ // fill test data
			console.log('Creating races testdata');
			
			testData.forEach(function(race){
				new Race(race).save(saveCallback);
			});
		} else console.log('Skipping create races testdata, allready present');

		if(callback) callback();
	});
};

function fillTestUser(callback){
	var testData = [
		{
			username: 'hitchhiker',
			password: 'password',
			firstname: 'Douglas',
			lastname: 'Adams',
			country: 'US',
			//race: ['1', '2', '4'] TODO 
		},
		{
			username: 'darrenshan',
			password: 'password',
			firstname: 'Darren',
			lastname: 'Shan',
			country: 'EN',
			//race: ['2', '1', '3'] TODO
		}
	];

	User.find({}, function(err, data){
		if(data.length == 0){ // fill test data
			console.log('Creating users testdata');
			
			testData.forEach(function(user){
				new User(user).save(saveCallback);
			});
		} else console.log('Skipping create users testdata, allready present');

		if(callback) callback();
	});
};

module.exports = function(mongoose){
	Race = mongoose.model('Race');
	User = mongoose.model('User');

	//fillTestRace(fillTestUser);
}
