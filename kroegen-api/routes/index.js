var express = require('express');
var router = express.Router();
var http = require("http");
var io = require('socket.io');
var url = require('url');

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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
