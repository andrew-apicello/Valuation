var request = require("request");
var cheerio = require("cheerio"); //server side Jquery
var db = require("./models");
var express = require("express");
var app = express();




exports.getRevenue = function(ticker,rank,res){
	var result;
	var revenue;
	var Reveune = {}
	var requestTicker = "https://finance.yahoo.com/quote/" + ticker +"/financials?p=" + ticker;

	request(requestTicker, function(error, response, html) {

		var results = []
		var $ = cheerio.load(html);

		$('td').each(function(i, element) {
			var title = $(element)
			.children("span")
			.text();  
			results.push(title)
		});


		// console.log(results);

		result = {};

		result.ticker = ticker.toLowerCase();
		result.rank = rank;
		result.revenueCurrent = results[7];
		result.revenuePrevious = results[8];
		result.revenuePreviousTwo = results[9];

		result.costCurrent = results[11];
		result.costPrevious = results[12];
		result.costPreviousTwo = results[13];

		result.grossProfitCurrent = results[15];
		result.grossProfitPrevious = results[16];
		result.grossProfitPreviousTwo = results[17];

		result.researchCurrent = results[20];
		result.researchPrevious = results[21];
		result.researchPreviousTwo = results[22];

		result.sellingGACurrent = results[24];
		result.sellingGAPrevious = results[25];
		result.sellingGAPreviousTwo = results[26];

		result.nonRecurringCurrent = results[28];
		result.nonRecurringPrevious = results[29];
		result.nonRecurringPreviousTwo = results[30];

		result.operatingIncomeorLossCurrent = results[40];
		result.operatingIncomeorLossPrevious = results[41];
		result.operatingIncomeorLossPreviousTwo = results[42];

		result.earingsBeforeTaxesCurrent = results[49];
		result.earingsBeforeTaxesPrevious = results[50];
		result.earingsBeforeTaxesPreviousTwo = results[51];
		


		// console.log(result);


		db.Fundamentals
		.create(result)
		.then(function(dbArticle) {
			console.log("Scrape Complete");
		})
		.catch(function(err) {
			console.log(err);
		});


		console.log(result);
		console.log("this is the get revenue result^^^")
		res.json(result);

	});

}
