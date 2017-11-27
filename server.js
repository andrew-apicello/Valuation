var express = require("express");
var path = require("path");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios"); //promise based http library
var cheerio = require("cheerio"); //server side Jquery
var db = require("./models");
var PythonShell = require('python-shell');
var scrapeFundamentals = require("./getRevenue.js");
var scrapeBiotech = require("./Scrape_Top_Biotech.js")
var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
	console.log("App running on port " + PORT + "!");
});

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(express.static("public"));

//======================Configure Database==============================
mongoose.Promise = Promise;


if (process.env.MONGODB_URI){
	mongoose.connect(process.env.MONGODB_URI);
	console.log("connected remotely");
} else {
	mongoose.connect("mongodb://localhost/financials", {
		useMongoClient: true
	});
	console.log("connected locally");
}



//==================================Routes=========================================


app.post("/python", function(req, res) {
	console.log("Enter Python Shell");

	dataArray=[]


	for (var i=0; i<99;i++){
		let close = req.body["data[" + i + "][close]"];
		dataArray.push(close);
	}

	console.log(dataArray);

	// var testData = [["name","New York",],[31,45]];
	var pyshell = new PythonShell('my_script.py');
	pyshell.send(dataArray);
	pyshell.on('message', function (message) {

		console.log("Completed Script: " + message)
		message = message.split('').slice(3,-3).join("")
		res.send(message)
	});

	pyshell.end(function (err) {
		if (err) throw err;
		console.log('Python Script Complete');
	});
})







app.get("/scrape", function(req, res) {
	scrapeBiotech.scrapeBiotech()
	console.log("added top biotech companies to the database")
});



app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "./public/index.html"));
});



app.get("/fundamentals/:ticker", function(req,res){

	var ticker = req.params.ticker.toLowerCase();

	db.Fundamentals.findOne({ticker: ticker}, function(err, data) {
		if (!data) {
			scrapeFundamentals.getRevenue(ticker,1,res)
		}  else {

			console.log("data");
			console.log("Returned Data From Database^^^");
			res.json(data);
		}
	})

});




app.get("/all", function(req, res) {
	db.Fundamentals.find({}, function(err, data) {
    // Log any errors if the server encounters one
    if (err) {
    	console.log(err);
    }
    // Otherwise, send the result of this query to the browser
    else {
    	res.json(data);
    }
});
});
