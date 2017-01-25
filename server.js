var http = require('http');
var fs = require('fs');
var path = require('path');
var index = path.resolve(__dirname, './index.html');

console.log('Listening!');


var express = require('express');

var app = express();
app.get('/', function(req, res){
    res.send('hello world');
});

app.get('/test', function(req, res){
    res.send('nous sommes dans test');
});

app.listen(3000);