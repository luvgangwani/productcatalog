var express = require('express');

var path = require('path');

var bodyParser = require('body-parser');

var mysql = require('mysql');

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

	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'password_123',
		database: 'productcatalog'
	});

	connection.connect(function(err){

		if(err){

			console.log("Unable to connect: " + err);
		}
		else {

			console.log("Connected successfully!");

			var sql = "SELECT pid, pname, pdesc";
			sql += " FROM productlist";

			connection.query(sql, function(err, rows, fields){

				if(err){

					console.log("Unable to get product data: " + err);
				}
				else {

					// console.log(rows);
					response.render('viewproducts', {'products':rows})
				}
			});
		}
	})

});

app.get('/viewproduct/:id', function(request, response){

	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'password_123',
		database: 'productcatalog'
	});

	connection.connect(function(err){

		if(err){

			console.log("Unable to connect: " + err);
		}
		else{

			console.log("Connected successfully!");

			var sql = "SELECT pname, pdesc, pimg"
			sql += " FROM productlist"
			sql += " WHERE pid = " + request.params['id']

			connection.query(sql, function(err, rows, fields){

				if(err){

					console.log("Unable to get the data: " + err);
				}
				else{

					response.render('productdetails',{'product':rows})
				}
			});
		}
	})
});

app.get('/addnewproduct', function(request, response){

	response.render('newproduct');

});

app.post('/addnewproduct', function(request, response){

	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'password_123',
		database: 'productcatalog'
	});

	connection.connect(function(err){

		if(err){
			console.log("Unable to connect:" + err);
		}
		else{

			console.log("Connected successfully!");

			var sql = "INSERT INTO productlist(pname, pdesc, created, updated)";
			sql += "VALUES('"+request.body.pname+"','"+request.body.pdesc+"',"+Date.now()+","+Date.now()+");";

			//console.log(sql);

			connection.query(sql, function(err, result){

				if(err){

					console.log("Unable to add a product: "+err);
				}
				else{

					response.send(result);
				}
			});
		}
	});

});
app.listen('3333', function(){
	console.log("Server started..");
});