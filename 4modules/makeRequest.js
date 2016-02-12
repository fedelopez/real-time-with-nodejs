var http = require('http');

var options = {host: 'localhost', port: 8080, path: '/', method: 'POST'};

var makeRequest = function (message) {
    var request = http.request(options, function (response) {
        response.on('data', function (data) {
            console.log(message);
        });
    });
    request.end(message + "\n");
};
module.exports = makeRequest;