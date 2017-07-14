var express = require('express');

var path = require('path');

var bodyParser = require('body-parser');

var app = express();

app.use('/scripts', express.static(__dirname + "/node_modules/bootstrap/dist"));
app.use('/local', express.static(__dirname + "/assets"));
app.use('/js', express.static(__dirname + "/node_modules/jquery/dist"));
app.use(bodyParser());

app.set('view engine', 'jade');

app.get('/', function(request, response){

	response.render('index');
});

app.get('/viewproducts', function(request,response){

	response.send("Page contains a list of products");

});

app.get('/addnewproduct', function(request, response){

	response.render('newproduct');

});

app.post('/addnewproduct', function(request, response){

	console.log(request.body);

});
app.listen('3333', function(){
	console.log("Server started..");
});