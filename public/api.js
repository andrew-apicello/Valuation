const base = "https://www.alphavantage.co/query?"
const parameters = "function=TIME_SERIES_Daily&symbol="
const apiKey = "&apikey=V7GG9G0QPWNJUPAW"
var symbol = ""


$("#symbolSubmit").on("click", function() {

  event.preventDefault(); //if a submit button was used
  symbol = $("#symbol").val().trim();
  console.log("Symbol: " + symbol);
  
  $("#graph").empty();
  $("#chart").empty();

  symbol = symbol.toLowerCase();
  runRequest(symbol);
  displayFinancialData(symbol);
});


function displayFinancialData(symbol){

  $.getJSON("/fundamentals/" + symbol, function(data) {
    console.log(data);

    $("#chart").append("<p>Ticker: " + data.ticker +"</p>" +
     "<p>2017 Total Revenue: " + data.revenueCurrent +"</p>" +
     "<p>2016 Total Revenue: " + data.revenuePrevious +"</p>" +
     "<p>2015 Total Revenue " + data.revenuePreviousTwo +"</p>" +
     "<p>2017 Cost of Goods Sold: " + data.costCurrent +"</p>" +
     "<p>2016 Cost of Goods Sold: " + data.costPrevious +"</p>" +
     "<p>2015 Cost of Goods Sold:" + data.costPreviousTwo +"</p>" +
     "<p>2017 Profit: " + data.grossProfitCurrent +"</p>" +
     "<p>2016 Profit: " + data.grossProfitPrevious +"</p>" +
     "<p>2015 Profit: " + data.grossProfitPreviousTwo +"</p>"
     );
  });
}




function runRequest(ticker){

  $.ajax({
   url: base + parameters + symbol + apiKey,
   method: 'GET',
 }).done(function(result) {
   var example = result["Time Series (Daily)"]
   let data = [{}];
   let dataGraph = [{}]


// console.log(result)

for (var i=0; i< 100;i++){

  example2 = example[Object.keys(example)[i]]

  var date = [Object.keys(example)[i]].toString();



  var open = example2[Object.keys(example2)[0]];
  var high = example2[Object.keys(example2)[1]];
  var low = example2[Object.keys(example2)[2]];
  var close = example2[Object.keys(example2)[3]];
  var volume = example2[Object.keys(example2)[4]];


  high = parseInt(high);
  close = parseInt(close);
  data.push({date: date,high:high});
  dataGraph.push({date: date, high: high.toString(),close: close});
}



dataGraph = dataGraph.slice(1)
drawGraph(dataGraph);

  // console.log(dataGraph)

}).fail(function(err) {
	throw err;
});

}

//==========================Draw Column Chart================================



function drawChart(data){

	console.log(data);

  var margin = {top: 40, right: 20, bottom: 30, left: 40},
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

  var formatPercent = d3.format("0");

  var x = d3.scale.ordinal()
  .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
  .range([height, 0]);

  var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

  var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .tickFormat(formatPercent);

  var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>high:</strong> <span style='color:red'>" + d.high + "</span>";
  })

  var svg = d3.select("#chart").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.call(tip);


// The following code was contained in the callback function.

x.domain(data.map(function(d) { return d.date; }));
y.domain([0, d3.max(data, function(d) { return d.high; })]);

svg.append("g")
.attr("class", "x axis")
.attr("transform", "translate(0," + height + ")")
.call(xAxis);

svg.append("g")
.attr("class", "y axis")
.call(yAxis)
.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 6)
.attr("dy", ".71em")
.style("text-anchor", "end")
.text("high");

svg.selectAll(".bar")
.data(data)
.enter().append("rect")
.attr("class", "bar")
.attr("x", function(d) { return x(d.date); })
.attr("width", x.rangeBand())
.attr("y", function(d) { return y(d.high); })
.attr("height", function(d) { return height - y(d.high); })
.on('mouseover', tip.show)
.on('mouseout', tip.hide)

function type(d) {
  d.high = + d.high;
  return d;
}

};








//==========================Draw Line Graph================================

function drawGraph(data){

// Get the data
// var data = [{
//     date: "2017-11-10",
//     high: "58.13",
//     close: "58.13"
// }, {
//     date: "2017-11-11",
//     high: "53.98",
//     close: "58.13"
// }, {
//     date: "2017-11-12",
//     high: "67.00",
//     close: "58.13"
// }, {
//     date: "2017-11-13",
//     high: "89.70",
//     close: "58.13"
// }, {
//     date: "2017-11-14",
//     high: "99.00",
//     close: "58.13"
// }];


var margin = {
  top: 30,
  right: 20,
  bottom: 30,
  left: 50
};
var width = 600 - margin.left - margin.right;
var height = 270 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y-%m-%d").parse;

var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis().scale(x)
.orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
.orient("left").ticks(5);

var valueline = d3.svg.line()
.x(function (d) {
  return x(d.date);
})
.y(function (d) {
  return y(d.high);
});

var svg = d3.select("#graph")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");



data.forEach(function (d) {
  d.date = parseDate(d.date);
  d.high = +d.high;
  d.close = +d.close;
});

// Scale the range of the data
x.domain(d3.extent(data, function (d) {
  return d.date;
}));
y.domain([0, d3.max(data, function (d) {
  return d.high;
})]);
y.domain([0, d3.max(data, function (d) {
  return d.close;
})]);

svg.append("path") // Add the valueline path.
.attr("d", valueline(data));

svg.append("g") // Add the X Axis
.attr("class", "x axis")
.attr("transform", "translate(0," + height + ")")
.call(xAxis);

svg.append("g") // Add the Y Axis
.attr("class", "y axis")
.call(yAxis);
}