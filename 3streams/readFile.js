var fs = require('fs');

fs.readFile('package.json', function (error, contents) {
    console.log(contents.toString());
});

