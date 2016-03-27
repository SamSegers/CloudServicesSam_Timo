var express = require('express');
var router = express.Router();
var http = require("http");
var io = require('socket.io');
var url = require('url');
var passport = require('passport');
var bodyParser = require('body-parser');

var User = require('../models/user');

var server = http.createServer(function(request,response)
{
	var path = url.parse(request.url).pathname;
	
	switch(path)
	{
		default:
			response.writeHead(404);
			response.end();
			break;
	}
});

//io.on('connection',function(socket){});

server.listen(3000);

var listener = io.listen(server);
	listener.sockets.on('connection',function(socket){
});

router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
			return res.send('nope');
            //return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
			return res.send('aye');
            //res.redirect('/');
        });
    });
});

/*router.get('/login', function(req, res) {
    res.render('login', { user : req.user, message : req.flash('error')});
});*/

//app.post('/login', passport.authenticate('local'));
//app.post('/signup', passport.authenticate('local'));

router.post('/login', passport.authenticate('local'),/*bodyParser.urlencoded({ extended: true }),*/ function(req, res) {
	/*req.login(req.body, function(err) {
		if (err) { console.log(err); }
	});*/

	//console.log(req.user.username);
	/*passport.authenticate('local', function (err, user, info) {
		console.log(err);*/

	//req.session.cookie.expires = false;
	//req.session.cookie.maxAge = 5 * 60 * 1000;
	req.session.user = req.user;
	console.log(req.session);
	//req.session.save(function (err) {
		/*if (err) return res.send('an error occured');
		return res.send('authorized');*/
	//});
	res.send('authorized');
	//});
});

router.get('/logout', function(req, res) {
    req.logout();
    //res.redirect('/');
});

module.exports = router;
