$(function(){
	$.get('http://localhost:3001/races', function(races){
		races.forEach(function(race){
			$('.race-list ul').append(
				"<li data-id='"+race._id+"' class='row'>"+
					"<span class='name'>"+race.name+"</span>"+
					"<span class='author-id'>"+race.authorId+"</span>"+
				"</li>"
			);
		});
	});
});
