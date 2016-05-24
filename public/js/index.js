"use strict"

let $signUpForm = $('.sign-up-form');
let $signInForm = $('.sign-in-form');

$('.sign-up').click(function(){
	let body = {
		username: $signUpForm.find('.username').val(),
		password: $signUpForm.find('.password').val()
	}

	$.post('http://localhost:3001/signup', body, function(data){
		console.log(data);
	});
});

$('.sign-in').click(function(){
	let body = {
		username: $signInForm.find('.username').val(),
		password: $signInForm.find('.password').val()
	}

	$.post('http://localhost:3001/login', body, function(data){
		console.log(data);
	});
});
