var fs = require('fs');

var origin = fs.createReadStream("./large/sentences.txt");
var destination = fs.createWriteStream("./large/sentences2.txt");

origin.pipe(destination);