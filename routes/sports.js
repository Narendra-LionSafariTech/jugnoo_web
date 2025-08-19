const express = require('express');
const router = express.Router();
const sportsCtrl=require("../controllers/sports")

router.get("/cricket/current", sportsCtrl.currentCricketMatches);

module.exports = router;
