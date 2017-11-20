var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FundamentalsSchema = new Schema({
  rank: Number,
  ticker: {
    type: String,
    unique: true
  },
  revenueCurrent:String,
  revenuePrevious:String,
  revenuePreviousTwo: String,
  costCurrent: String,
  costPrevious: String,
  costPreviousTwo: String,
  grossProfitCurrent: String,
  grossProfitPrevious: String,
  grossProfitPreviousTwo: String,
  researchCurrent:String,
  researchPrevious:String,
  researchPreviousTwo: String,
  sellingGACurrent: String,
  sellingGAPrevious: String,
  sellingGAPreviousTwo: String,
  nonRecurringCurrent:String,
  nonRecurringPrevious:String,
  nonRecurringPreviousTwo:String,
  operatingIncomeorLossCurrent: String,
  operatingIncomeorLossPrevious: String,
  operatingIncomeorLossPreviousTwo: String
});

var Fundamentals = mongoose.model("Fundamentals", FundamentalsSchema);


module.exports = Fundamentals;
