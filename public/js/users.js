$(function(){
	loadUsers();
});

function loadUsers(){
	let $list = $('.user-list ul');

	$list.html('');

	$.get('/users', function(users){
		let odd = false;

		users.forEach(function(user){
			$list.append(
				"<li data-id='"+user._id+"' class='row"+(odd?' odd':'')+"'>"+
					"<div class='id'>"+
						"<span>"+user._id+"</span>"+
					"</div>"+
					"<div class='username'>"+
						"<span>"+user.username+"</span>"+
					"</div>"+
					"<div class='password'>"+
						"<span>"+user.password+"</span>"+
					"</div>"+
				"</li>"
			);

			odd ^= true;
		});
	});
}
