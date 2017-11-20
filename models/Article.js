var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  ticker: {
    type: String,
    unique : true,
    required: true
  },
  link: {
    type: String,
    unique : true,
    required: true
  },
  rank: {
    type: Number,
    unique : true,
  }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
