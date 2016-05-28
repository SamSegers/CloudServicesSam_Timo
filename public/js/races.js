$(function(){
	loadRaces();
});

function loadRaces(){
	var $list = $('.race-list ul');

	$list.html('');

	$.get('/races', function(races){
		var odd = false;

		races.forEach(function(race){
			$list.append(
				"<li data-id='"+race._id+"' class='row"+(odd?' odd':'')+"'>"+
					"<div class='name'><span>"+race.name+"</span></div>"+
					"<dvi class='author-id'><span>"+race.authorId+"</span></div>"+
				"</li>"
			);

			odd ^= true;
		});
	});
}

function addRace(){
	var name = $("section.input input.name").val();

	$.post('/races/new/'+name, function(race){
		loadRaces();
	});
}
