var express = require('express');
var router = express.Router();
var server = require('http').createServer();
var io = require('socket.io')(server);

io.on('connection',function(socket){});

server.listen(3000);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
