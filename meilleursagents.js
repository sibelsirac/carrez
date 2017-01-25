var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
function meilleurs(villeb, codeb, typeb,pricetot,surfaceb){
app.get('/scrape', function(req, res){

url = 'https://www.meilleursagents.com/prix-immobilier/'+villeb+'-'+codeb+'/';
console.log(url) ;
request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);

     var price, good_deal;
    var json = { price : "", good_deal : ""};
if(typeb =='Maison'){
var priced = $('#synthese > div.prices-summary.baseline > div.prices-summary__values > div:nth-child(3) > div.small-4.medium-2.columns.prices-summary__cell--median').text();
	var priceb = priced.replace ( /[^\d.]/g, '' );
console.log(priceb) ;
json.price=priceb;
}
    else{
	var priced = $('#synthese > div.prices-summary.baseline > div.prices-summary__values > div:nth-child(2) > div.small-4.medium-2.columns.prices-summary__cell--median').text();
	var priceb = priced.replace ( /[^\d.]/g, '' );
console.log(priceb) ;
json.price=priceb;
	}
     var pricepm=pricetot/surfaceb;
if(pricepm>=priceb){
console.log('pas un bon deal');
json.good_deal='no';
}	 
   else{
   console.log('bon deal');
   json.good_deal='yes';}
}

// To write to the system we will use the built in 'fs' library.
// In this example we will pass 3 parameters to the writeFile function
// Parameter 1 :  output.json - this is what the created filename will be called
// Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
// Parameter 3 :  callback function - a callback function to let us know the status of our function

fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})

// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
res.send('Check your console!')

    }) ;
})
}
meilleurs('courbevoie', '92400', 'Maison','918000','110');
app.listen('3000'); 
console.log('Magic happens on port 3000'); 
exports = module.exports = app;
