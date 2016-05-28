var $txtName = $("section.race-input input.name");
var $btnNew = $("section.race-input input.new");
var selected = '.race-list ul li.selected';
var id;

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
					"<div class='author-id'><span>"+race.authorId+"</span></div>"+
				"</li>"
			);

			odd ^= true;
		});
	});
}

$(".race-list ul").on('click', 'li', function(){
	deselect();
	$(this).addClass('selected');

	id = $(this).attr('data-id');
	$txtName.val($(this).find('div.name span').text());
	$btnNew.prop("disabled", false);
});

function newRace(){
	$txtName.val('');
	$btnNew.prop("disabled", true);
	deselect();
	id = null;
}

function deselect(){
	$(selected).removeClass('selected');
}

$txtName.keyup(function(e){
    if(e.keyCode == 13) saveRace();
});

function saveRace(){
	var name = $txtName.val();

	if(id==null){
		$.post('/races/new/'+name, function(race){
			$btnNew.prop("disabled", false);
			loadRaces();
		}, function(err){
			console.log(err);
			$("section.race-message").html(err);
		});
	}else{
		$.ajax({
			url: '/races/'+id+'/name/'+name,
			type: 'PUT',
			success: function(data) {
				//loadRaces();
				$(selected).find('div.name span').text(name);
			},
			error: function(err){
				console.log(err);
				$("section.race-message").html(err.responseText);
			}
		});
	}
}
