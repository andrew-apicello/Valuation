function drawChart(data,axis){

	// console.log(data);

  $("#chart").html("<h2 style=\"color:black;\">Previous Twenty Quarters of Revenue</h2>")

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
    return "<strong>Revenue (B USD)</strong> <span style='color:red'>" + d.high + "</span>";
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
.text(axis);

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

var ticks = d3.selectAll(".tick text");
ticks.attr("class", function(d,i){
    if(i%3 != 0) d3.select(this).remove();
});

};