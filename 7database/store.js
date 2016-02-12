var redis = require('redis');
var client = redis.createClient();

var saveMessage = function (nickname, text) {
    client.lpush("messages", JSON.stringify({nickname: nickname, text: text}), function (err, response) {
        client.ltrim("messages", 0, 9);
    });
};
module.exports.saveMessage = saveMessage;

var getMessages = function (callback) {
    client.lrange("messages", 0, -1, function (err, messages) {
        var result = messages && messages.length > 0 ? messages.reverse() : [];
        callback(result.map(function (message) {
            return JSON.parse(message);
        }));
    });
};
module.exports.getMessages = getMessages;

var addChatter = function (chatter) {
    client.sadd("chatters", chatter);
};
module.exports.addChatter = addChatter;

var removeChatter = function (chatter) {
    client.srem("chatters", chatter);
};
module.exports.removeChatter = removeChatter;

var getChatters = function (callback) {
    client.smembers("chatters", function (err, names) {
        callback(names);
    })
};
module.exports.getChatters = getChatters;
