var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var store = require('./store');

io.on('connection', function (client) {
    console.log('client connected: ');
    client.emit('messages', {nickname: "Admin", text: "Connected"});
    client.on('join', function (name) {
        console.log(name + ' joined');
        client.nickname = name;
        store.getMessages(function (messages) {
            messages.forEach(function (message) {
                client.emit("messages", {nickname: message.nickname, text: message.text});
            });
        });
        store.addChatter(name);
        store.getChatters(function (chatters) {
            chatters.forEach(function (chatter) {
                io.emit("add chatter", {nickname: chatter});
            })
        });
    });
    client.on('chat message', function (msg) {
        io.emit("messages", {nickname: client.nickname, text: msg});
        store.saveMessage(client.nickname, msg);
    });
    client.on('disconnect', function () {
        io.emit("remove chatter", {nickname: client.nickname});
        store.removeChatter(client.nickname);
    });
});

app.use(express.static(__dirname + "/public"));
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

server.listen(8080);
console.log("Server listening at port 8080");