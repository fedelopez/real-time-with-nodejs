var express = require('express');
var app = express();

app.get("/tweets/:username", function (request, response) {
    var username = request.params.username;
    response.locals = {name: username};
    response.render('index-username.ejs')
});
app.listen(8080);
