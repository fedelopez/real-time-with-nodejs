var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function (client) {
    console.log('client connected: ');
    client.emit('messages', {text: "Connected"});
    client.on('join', function (name) {
        console.log(name + ' joined');
        client.name = name;
    });
    client.on('chat message', function (msg) {
        console.log('Message received: ' + msg);
        console.log('About to emit');
        io.emit("messages", {text: client.name + ": " + msg})
    });
});

app.use(express.static(__dirname + "/public"));
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

server.listen(8080);
console.log("Server listening at port 8080");