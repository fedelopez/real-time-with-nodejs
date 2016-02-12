var http = require('http');

http.createServer(function (req, resp) {
    resp.writeHead(200);
    resp.write("Hello 1!");
    setTimeout(function () {
        resp.write("Hola 2!");
        resp.end();
    }, 5000);

}).listen(8080);

console.log("Listening on port 8080");