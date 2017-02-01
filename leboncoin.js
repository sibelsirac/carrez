var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

module.exports=function(url,callback){

request(url, function(error, response, html){

    if(!error){
        var $ = cheerio.load(html);

   var price, surface, type,ville,piece,code;
    var json = { price : "", surface : "", type : "", ville : "",code : "", piece : ""};

    var priced = $('#adview > section > section > section.properties.lineNegative > div:nth-child(5) > h2 > span.value').text();
	var priceb = priced.replace ( /[^\d.]/g, '' );
console.log(priceb) ;
json.price=priceb;
       
    

    var surfaced = $('#adview > section > section > section.properties.lineNegative > div:nth-child(9) > h2 > span.value').text();
var surfaceb = surfaced.replace ( 'm2', '' );
surfaceb=surfaceb.trim();
	console.log(surfaceb) ;
	
json.surface=surfaceb;

    var typeb = $('#adview > section > section > section.properties.lineNegative > div:nth-child(7) > h2 > span.value').text();
console.log(typeb) ;
json.type=typeb;


    var coded = $('#adview > section > section > section.properties.lineNegative > div.line.line_city > h2 > span.value').text();
var codeb = coded.replace ( /[^\d.]/g, '' );
	console.log(codeb) ;
json.code=codeb;

    var villed = $('#adview > section > section > section.properties.lineNegative > div.line.line_city > h2 > span.value').text();
	var villeb=villed.replace(codeb,'');
		var villeb=villeb.replace('\n','');
			var villeb=villeb.trim();
			villeb=villeb.toLowerCase()
			var villeb=villeb.replace(' ','-');
console.log(villeb) ;
json.ville=villeb;

  var pieceb = $('#adview > section > section > section.properties.lineNegative > div:nth-child(8) > h2 > span.value').text();
console.log(pieceb) ;
json.piece=pieceb;
//console.log(json);


}
fs.writeFile('output.json', JSON.stringify(json, null, 4), function (data) {
        //execute the callback, passing it the data
        callback(data);});
}
);




}
