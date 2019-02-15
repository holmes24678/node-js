// the below modules should be installed on your machine

//to install any modules by npm
// npm install 'module name'	. this will automaticlly install the modules
//to know more about modules (or) packages visit https://www.npmjs.com .

//to use modules in your code just type var 'module name' = require('module name') 
 
// to run the code , type 'nodemon 'name of the file.js' 
var express = require('express');
var mysql = require('mysql');
var bodyparser = require('body-parser');
var url =  bodyparser.urlencoded({ extended: false })
var app = express();

// create a database connection.

var con = mysql.createConnection({
	host: "localhost",
	user : "root",
	password : "",
	database : "data"
});

// i am using ejs(embedded java script)files to view the html output.you can use .html files also

app.set('view engine','ejs');

app.get('/form',function(req,res){
	res.render('form');
});

app.get('/created',function(req,res){
	res.render('created');
});

app.get('/profile',function(req,res){
	res.render('profile');
});

app.get('/login',function(req,res){
	res.render('login');
});

// the created.ejs is the data posting file for the registrations.

app.post('/created',url ,function(req,res){
	res.render('created',{data:req.body});
	// connection to the database tables.
	con.connect(function(err) {
		//if error occured it throws error.
		if(err) throw err;\
		// else it prints connected sucessfully.
		console.log('connected sucessfully');
		console.log(req.body.password);
		var sql = "INSERT INTO user (`name`,`password`) VALUES ('"+req.body.name+"', '"+req.body.password+"' )";
		con.query(sql, function(err , rows , field){
			if(err){
				console.log("error");}
				else{
					//if 1 row affected the users data was sucessfully entered into the database tables.
					console.log("1 row affected");
				}
			});
		});
	});
	 
	 //this is for the authentication of the registered user.
	
	app.post('/profile',url ,function(req,res){
		let	name = req.body.name; // using javascript6.
		let password = req.body.password; 
		console.log(req.body.name);
		console.log(req.body.password);
		con.connect(function(err) {
			if(!err){
				console.log('connected sucessfully');
				var sql = "SELECT name FROM user where name = ? and password = ? " ;
				con.query(sql, [name, password], function(err ,data , fields){
					if(err){
						console.log("error");
					} 
					// if the length of the row packet data is 1 the authentication is accessed.
					if (data.length == 1){
						res.render('profile',{data:req.body});
					}
					});
				}
				else{
					console.log('database error');
				}
			})
		});
		//this is the port you are listening.
		app.listen(1000);
		console.log('you are listening to port 1000');
		