"use strict"

let $txtName = $("section.race-input input.name");
let $btnNew = $("section.race-input input.new");
let selected = '.race-list ul li.selected';
let id;

$(function(){
	loadRaces();
});

function loadRaces(){
	let $list = $('.race-list ul');

	$list.html('');

	$.get('/races', function(races){
		let odd = false;

		races.forEach(function(race){
			$list.append(
				"<li data-id='"+race._id+"' class='row"+(odd?' odd':'')+"'>"+
					"<div class='name'>"+
						"<span>"+race.name+"</span>"+
					"</div>"+
					"<div class='author-id'>"+
						"<span>"+race.authorId+"</span>"+
					"</div>"+
					"<div class='delete'>"+
						"<span>delete</span>"+
					"</div>"+
				"</li>"
			);

			odd ^= true;
		});
	});
}

$(".race-list ul").on('click', 'li .name, li .author-id', function(){
	select($(this).parent());
});

function select(entry){
	deselect();
	entry.addClass('selected');
	id = entry.attr('data-id');
	$txtName.val(entry.find('div.name span').text());
	$btnNew.prop("disabled", false);
	$(".races input.update").val('update');
}

function newRace(){
	$txtName.val('');
	$(".races input.update").val('add');
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
	
	
	
	let name = $txtName.val();
	let $list = $('.race-list ul');
	if(id==null){
		
		
		$.post('/races/new/'+name, 
			function(race){
				$btnNew.prop("disabled", false);

				$txtName.val('');

				let $last = $list.children().last();
				let odd = !$last.hasClass('odd');	

				$list.append(
					"<li class='row"+(odd?" odd":'')+"' data-id='"+race._id+"'>"+
						"<div class='name'>"+
							"<span>"+race.name+"</span>"+
						"</div>"+
						"<div class='author-id'>"+
							"<span>"+race.authorId+"</span>"+
						"</div>"+
						"<div class='delete'>"+
							"<span>delete</span>"+
						"</div>"+
					"</li>"
				);
			}
		).fail( 
			function(err){
				console.log(err);
				$("section.race-message").html(err);
			}
		);
	}else{
		
		$.ajax({
			url: '/races/'+id+'/name/'+name,
			type: 'PUT',
			success: function(data) {
				$list.find("li.selected .name > span").text(name);
			},
			error: function(err){
				console.log(err);
				$("section.race-message").html(err.responseText);
			}
		});
	}
}

$('section.race-list > ul').on('click', 'li .delete', function(){
	removeRace($(this).parent());
});

function removeRace(entry){
	let id = entry.attr('data-id');
	
	var socket = io.connect('http://localhost:3001');
	socket.emit('deleteRace', { Id: id });
	
	$.ajax({
		url: '/races/'+id,
		type: 'DELETE',
		success: function(data) {
			loadRaces();
		},
		error: function(err){
			console.log(err);
			$("section.race-message").html(err.responseText);
		}
	});
}
