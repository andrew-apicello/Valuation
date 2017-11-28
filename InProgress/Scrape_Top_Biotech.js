var request = require("request");
var cheerio = require("cheerio"); //server side Jquery
var db = require("./models");
var scrapeFundamentals = require("./getRevenue.js");

exports.scrapeBiotech = function(){
request("https://en.m.wikipedia.org/wiki/List_of_largest_biotechnology_%26_pharmaceutical_companies", function(error, response, html) {

		var $ = cheerio.load(html);
		let i=1;

		$('a.external').slice(0,1).each(function(i, element) {
			var results = {};

			results.ticker = $(element).text();
			results.link = $(element).attr("href");
			results.rank = i;

			console.log(results)

			db.Article
			.create(results)
			.then(function(dbArticle) {
				console.log("here")
				res.send("Scrape Complete");
			})
			.catch(function(err) {
				res.json(err);
			});

			//enable to scrape the fundamentals of all scraped tickers
			// getRevenue(results.ticker,results.rank)
			i++;
		});
	});

}