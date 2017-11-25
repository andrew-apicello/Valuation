function getFundamentalFromSEC(ticker){

const appKey = "2s6bv57phxdxetkxhry3zupk"
const timeSeries = "ttm"//monthly
const numberTime = "20"

$.ajax({
 url: "http://edgaronline.api.mashery.com/v2/corefinancials/" + timeSeries + "?primarysymbols=" + ticker + "&numperiods=" + numberTime + "&appkey=" + appKey,
 method: 'GET',
}).done(function(result) {
  // console.log(result.result.rows[0].values)
  // console.log(result.result.rows[0].values[1].value)

  // console.log(result.result.rows[0].values[45].field)
  // console.log(result.result.rows[0].values[45].value)

  var data = [{}];

  for (var i = 0; i< result.result.rows.length;i++){

    var date = result.result.rows[i].values[15].value.split("/");
    date = date[2] + "-" + date[1] + "-" + date[0];
    var high = result.result.rows[i].values[45].value;
    high = high /1000000000;
    high = high.toString();
    data.push({date: date, high:high});
  }
  data = data.reverse();

  drawChart(data,"Revenue");

})
}