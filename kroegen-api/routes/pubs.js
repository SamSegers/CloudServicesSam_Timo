var express = require('express');
var router = express.Router();

function getPubs(req, res){
	
}

function getPub(req, res){
	
}

router.route('/')
	.get(getPubs);

router.route('/pubname/:pubname')
	.get(getPub);