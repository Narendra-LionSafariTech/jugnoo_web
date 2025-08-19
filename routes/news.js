const express = require('express');
const router = express.Router();
const newsCtrl=require("../controllers/new")

router.get("/news/:category?", newsCtrl.getNews);

module.exports = router;
