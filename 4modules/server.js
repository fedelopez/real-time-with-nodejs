var http = require('http');

http.createServer(function (request, response) {
    response.writeHead(200);
    request.pipe(response);
    request.pipe(process.stdout);
}).listen(8080);

console.log("Listening on port 8080");