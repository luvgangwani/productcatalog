var express = require('express');

var path = require('path');

var bodyParser = require('body-parser');

var database = require('./database');

var mysql = require('mysql');

var result = null;

var app = express();

app.use('/scripts', express.static(__dirname + "/node_modules/bootstrap/dist"));
app.use('/local', express.static(__dirname + "/assets"));
app.use('/js', express.static(__dirname + "/node_modules/jquery/dist"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'jade');

app.get('/', function(request, response){

	response.render('index');
});

app.get('/viewproducts', function(request,response){

	database.get_product_list("productlist", ['pid', 'pname', 'pdesc'], function(result){

		response.render('viewproducts', {'products':result});

	});

});

app.get('/viewproduct/:id', function(request, response){

	database.get_product_details_by_id(request.params['id'],function(rows_product, rows_comments){
		
		response.render('productdetails',{
			'product':rows_product,
			'comments': rows_comments
		});
	});
});

app.post('/viewproduct/:id', function(request, response){

	var pid = request.params['id'];
	var comment_body = '';

	comment_body = request.body.comment;

	database.add_comment(pid, comment_body, function(result){

		response.send(result);
	});
});

app.get('/addnewproduct', function(request, response){

	response.render('newproduct');

});

app.post('/addnewproduct', function(request, response){

	var pname = request.body.pname;
	var pdesc = request.body.pdesc;

	database.add_new_product(pname, pdesc, function(result){

		response.send(result);
	});

});

app.listen('3333', function(){
	console.log("Server started..");
});