var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');


module.exports=function(villeb, codeb, typeb,pricetot,surfaceb,callback){


url = 'https://www.meilleursagents.com/prix-immobilier/'+villeb+'-'+codeb+'/';
console.log(url) ;
request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);

     var price, good_deal;
    var json = {price : "", good_deal : ""};
if(typeb =='Maison'){
var priced = $('#synthese > div > div.prices-summary__values > div.row.medium-uncollapse.baseline--half > div.small-4.medium-2.medium-offset-0.columns.prices-summary__cell--muted').text();
	var priceb = priced.replace ( /[^\d.]/g, '' );
	 priceb=priceb.replace('\n','');
	priceb=priceb.trim();
console.log(priceb) ;
json.price=priceb;
}
    else{
	var priced = $('#synthese > div > div.prices-summary__values > div:nth-child(2) > div.small-4.medium-2.columns.prices-summary__cell--median').text();
	var priceb = priced.replace ( /[^\d.]/g, '' );
	 priceb=priceb.replace('\n','');
	priceb=priceb.trim();
console.log(priceb) ;
json.price=priceb;
	}
     var pricepm=pricetot/surfaceb;
if(pricepm>=priceb){
console.log('pas un bon deal');  
json.good_deal='THIS IS NOT A GOOD DEAL';
}	 
   else{
   console.log('bon deal');
   json.good_deal='THIS IS A GOOD DEAL';}
}

fs.writeFile('meilleurs.json', JSON.stringify(json, null, 4), function (data) {
        //execute the callback, passing it the data
        callback(data);});
//var message="essai";
  // callback(message);
   })
   ;
}