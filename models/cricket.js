const mongoose = require("mongoose");

const CricketSchema = new mongoose.Schema({
  matches: { type: Array, default: [] },
  lastFetched: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Cricket", CricketSchema);