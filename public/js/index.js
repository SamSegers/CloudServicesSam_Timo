"use strict"

let $section = {
	menu: $('section.authentication-menu'),
	signUp: $('section.form.sign-up'),
	signIn: $('section.form.sign-in'),
	message: $('section.message')
}

$section.menu.find('.sign-up').click(function(){
	$section.signUp.show();	
	$section.signIn.hide();
});

$section.menu.find('.sign-in').click(function(){
	$section.signIn.show();	
	$section.signUp.hide();
});

$section.menu.find('.sign-out').click(function(){
	signOut();
});

$section.signIn.find('.button > input').click(function(){
	signIn();
});

$section.signUp.find('.button > input').click(function(){
	signUp();
});

$section.signIn.find(".username > input").keyup(function(e){
    if(e.keyCode == 13) $section.signIn.find(".password > input").focus();
});

$section.signIn.find(".password > input").keyup(function(e){
    if(e.keyCode == 13) signIn();
});

function signOut(){
	$section.menu.find('.username').hide();
	$(this).hide();
	$section.message.html('signed out');
}

function signIn(){
	let body = {
		username: $section.signIn.find('.username > input').val(),
		password: $section.signIn.find('.password > input').val()
	}

	$.post('/login', body, function(data){
		$section.message.html('signed in');
		$section.menu.find('.username').text(data.username).show();
		$section.menu.find('.sign-out').show();
		$section.signIn.hide();
		console.log(data);
	});
}

function signUp(){
	let body = {
		username: $section.signUp.find('.username > input').val(),
		password: $section.signUp.find('.password > input').val()
	}
	let passwordRepeat = $section.signUp.find('.password-repeat').val();

	if(body.password==passwordRepeat){
		$.post('/signup', body, function(data){
			$section.message.html('signed up');
			$section.signUp.hide();
			console.log(data);
		});
	}else $section.message.html('repeated password does not match');
}
