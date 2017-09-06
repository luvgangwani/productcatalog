var express = require('express');

var path = require('path');

var fs = require('fs');

var lr = require('readline');

var bodyParser = require('body-parser');

var database = require('./database');

var mysql = require('mysql');

var result = null;

var linereader = null;

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

	database.get_product_details_by_id(request.params['id'],function(rows_product, rows_comments,product_review){

		response.render('productdetails',{
			'product':rows_product,
			'comments': rows_comments,
			'product_review': product_review
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

/*app.get('/texttojson', function(request, response){

	var word_score = [];

	var i = 1;

	fs.writeFile('./lib/scores.json', '{\n',function(err){

		if(err){

			console.log(err);
		}
	});

	linereader = lr.createInterface({

		input: fs.createReadStream('./assets/AFINN/AFINN-111.txt')
	});

	linereader.on('line', function(line){

		word_score = line.split(' ');

		if(word_score.length > 2){

			while(i < word_score.length - 1){

				word_score[0] += ' ' + word_score[i];
				i++;
			}
		}
		fs.appendFile('./lib/scores.json', '\t"' + word_score[0] + '" : ' + word_score[word_score.length - 1] +',\n',function(err){

			if(err){

				console.log(err);
			}
		});
	});

	fs.appendFile('./lib/scores.json', '}',function(err){

		if(err){

			console.log(err);
		}
	});

});*/

app.listen('3333', function(){
	console.log("Server started..");
});