var http = require('http');
var fs = require('fs');

http.createServer(function (request, response) {
    var fileBytes = request.headers['content-length'];
    var uploadedBytes = 0;
    response.writeHead(200);
    var percentages = [];

    request.on('readable', function () {
        var chunk = null;
        while (null !== (chunk = request.read())) {
            uploadedBytes += chunk.length;
            var num = parseInt(uploadedBytes / fileBytes * 100);
            var msg = "Uploaded: " + num + "%\n";
            if (percentages.indexOf(num) < 0) {
                percentages.push(num);
                response.write(msg);
            }
        }
    });


    var newFile = fs.createWriteStream('./large/file.txt');
    request.pipe(newFile);

    request.on('end', function () {
        console.log('Uploaded!');
    })

}).listen(8080);

console.log("Listening on port 8080");