$("#symbolSubmit").on("click", function() {

  event.preventDefault(); //if a submit button was used
  symbol = $("#symbol").val().trim();
  
  $("#graph").empty();
  $("#chart").empty();

  symbol = symbol.toLowerCase();
  // runRequest(symbol);
  // displayFinancialData(symbol);
  getFundamentalFromSEC(symbol);
  runRequest(symbol)
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