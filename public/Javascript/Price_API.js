function runRequest(ticker){

  const base = "https://www.alphavantage.co/query?"
  const parameters = "function=TIME_SERIES_Daily&symbol="
  const apiKey = "&apikey=V7GG9G0QPWNJUPAW"
  var symbol = ticker.toLowerCase();


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