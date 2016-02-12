var http = require('http');
var fs = require('fs');

http.createServer(function (request, response) {
    response.writeHead(200);
    var newFile = fs.createWriteStream('./large/file.txt');
    request.pipe(newFile);

    request.on('end', function () {
        console.log('Uploaded!');
    })

}).listen(8080);

console.log("Listening on port 8080");