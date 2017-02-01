var fs = require('fs');
var async = require('async');
var express = require('express');
var ma =require('./meilleursagents.js');
var lbc =require('./leboncoin.js');
var http = require('http');
var path = require('path');
var ejs = require('ejs');
var bodyParser = require('body-parser');
   //var price, good_deal;
 //var json = { price : "", good_deal : ""};
 var app = express();
app.get('/', function(req, res){
    res.send(jsonb.good_deal);
});
app.use(express.static(path.join(__dirname, 'public')));
app.get('/test', function(req, res){
    res.sendFile('index.html', {root: path.join(__dirname, 'public')});
});
app.use(bodyParser.urlencoded({ extended: true })); 
app.post('/myaction', function(req, res) {



  lbc( req.body.name,function(messages) {
        console.log(messages);
		var json = require('./output.json');
console.log(json.price);
var result=ma(json.ville, json.code, json.type,json.price,json.surface,function(messages) {
        console.log(messages);
		var jsonb = require('./meilleurs.json');
		
app.get('/res', function(req, res){
    res.send(jsonb.good_deal);
});
var content = fs.readFileSync('public/resultat.html', 'utf-8');
var compiled = ejs.compile(content);

    var temp = jsonb.good_deal;

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(compiled({temp: temp}));

		
    });

    });
	 // res.send('You sent the name "' + req.body.name + '".');
});

app.listen(3000);


/*app.get('/message', function(req, res) {
    db.returnMessages(function(messages) {
        console.log(messages);
    });
});*/

