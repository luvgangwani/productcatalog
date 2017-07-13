var express = require('express');

var path = require('path');

var app = express();

app.use('/scripts', express.static(__dirname + "/node_modules/bootstrap/dist"));
app.use('/js', express.static(__dirname + "/node_modules/jquery/dist"));

app.set('view engine', 'jade');

app.get('/', function(request, response){

	response.render('index');
});

app.listen('3333', function(){
	console.log("Server started..");
});