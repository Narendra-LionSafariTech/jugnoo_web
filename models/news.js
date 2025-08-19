const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  category: { type: String, default: "sports" },
  articles: { type: Array, default: [] },
  lastFetched: { type: Date, default: Date.now }
});

module.exports = mongoose.model("News", NewsSchema);


