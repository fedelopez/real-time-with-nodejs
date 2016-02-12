var http = require('http');

http.createServer(function (req, resp) {
    resp.writeHead(200);
    req.on('readable', function () {
        var chunk = null;
        while (null != (chunk = req.read())) {
            console.log(chunk.toString());
            resp.write(chunk);
        }
    });
    req.on('end', function () {
        resp.end();
    })
}).listen(8080);

console.log("Listening on port 8080");