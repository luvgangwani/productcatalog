var constants = null;
var mysql = null;
var connection = null;
var connect_to_mysql = null;

constants = require("./constants");

mysql = require("mysql");

connection = mysql.createConnection({

	host: constants.host,
	user: constants.username,
	password: constants.password,
	database: constants.database

});

connect_mysql();

function connect_mysql(){

	connect_to_mysql = connection.connect(function(err){

			if(err){
				console.log("Unable to connect: " + err);
			}
			else{

				console.log("Connected successfully!");
			}
	});

	return connect_to_mysql;
}

function get_formatted_date(timestamp){

	var date = null;

	var day = null;

	var month = null;

	var months = [];

	var year = null;

	var hour = null;

	var min = null;

	var sec = null;

	var formatted_date = null;

	date = new Date(parseInt(timestamp));

	day = date.getDate();

	months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

	month = months[date.getMonth() - 1];

	year = date.getFullYear();

	hour = date.getHours();

	min = date.getMinutes();

	sec = date.getSeconds();

	formatted_date = day + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + sec;

	return formatted_date;
}

module.exports = {

	get_product_list: function(table, fields, cb){


		var field_list = '';

		if(fields.length == 0){

			field_list = "*";
		}
		else{

			for(i = 0; i< fields.length; i++){

				if(i != fields.length - 1){

					field_list += fields[i] + ", ";
				}
				else{

					field_list += fields[i];
				}
			}
		}

		var sql = "SELECT " + field_list;
		sql += " FROM " + table;

		connection.query(sql, function(err, rows, fields){

			if(err){

				console.log("Unable to display data: " + err);
			}
			else {

				console.log("Displaying Data..");
				cb(rows);
				//connection.end();
			}
		});
			
	},

	get_product_details_by_id: function(id, cb){

		var sql_comments = "SELECT *";
		sql_comments += " FROM comments";
		sql_comments += " WHERE pid = " + id;

		var sql = "SELECT pid, pname, pdesc, pimg"
		sql += " FROM productlist"
		sql += " WHERE pid = " + id;

		connection.query(sql_comments, function(err, rows_comments, fields){

			if(err){

				console.log("Unable to get the data: " + err);
			}
			else{

				rows_comments.forEach(function(comment, index){

					comment.created = get_formatted_date(comment.created);
				});
				connection.query(sql, function(err, rows_product, fields){

					if(err){

						console.log("Unable to get data: " + err);
					}
					else{

						cb(rows_product, rows_comments);
						//connection.end();
					}
				});

			}
		});
	},

	add_new_product: function(pname, pdesc, cb){


		var sql = "INSERT INTO productlist(pname, pdesc, created, updated)";
		sql += "VALUES('"+pname+"','"+pdesc+"',"+Date.now()+","+Date.now()+");";

		//console.log(sql);

		connection.query(sql, function(err, result){

			if(err){

				console.log("Unable to add a product: "+err);
			}
			else{

				cb(result);
				//connection.end();
			}
		});

	},

	add_comment: function(pid, comment_body, cb){

		var sql = "INSERT INTO comments(pid, comment, created, updated)";
		sql += " VALUES ("+pid+",'"+comment_body+"',"+Date.now()+","+Date.now()+");";

		connection.query(sql, function(err, result){
			if(err){
				console.log("Unable to add entry: " + err);
			}
			else{

				cb(result);
				//connection.end();
			}
		});

	}

}