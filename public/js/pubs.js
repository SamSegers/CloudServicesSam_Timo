$(function(){
	loadPubs();
});

function loadPubs(){
	let $list = $('.pub-list ul');

	$list.html('');

	$.get('/pubs', function(pubs){
		let odd = false;
		var pubs = JSON.parse(pubs)

		pubs.results.forEach(function(pub){
			$list.append(
				"<li data-id='"+pub.id+"' class='row"+(odd?' odd':'')+"'>"+
					"<div class='id'>"+
						"<span>"+pub.id+"</span>"+
					"</div>"+
					"<div class='name'>"+
						"<span>"+pub.name+"</span>"+
					"</div>"+
				"</li>"
			);

			odd ^= true;
		});
	});
}
