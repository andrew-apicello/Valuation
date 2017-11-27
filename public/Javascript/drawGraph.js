function drawGraph(data){

  $("#graph").html("<h2 style=\"color:black;\">Closing Price on Previous Hundred Trading Days</h2>")


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
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

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
  return y(d.close);
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