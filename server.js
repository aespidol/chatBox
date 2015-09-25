var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.render("index");
})

var server = app.listen(8000,function(){
	console.log("listening on port 8000");
})
var io = require('socket.io').listen(server);
var chat_log = [];
io.sockets.on('connection', function(socket){
	console.log("We Are Using Sockets!");
	console.log(socket.id);
	console.log(chat_log);
	socket.on("chat", function(data){
		chat_log.push(data.name+": "+data.message);
		console.log(chat_log);
		io.emit("update", {log: chat_log});
	})
	io.emit("start", {log: chat_log});
})