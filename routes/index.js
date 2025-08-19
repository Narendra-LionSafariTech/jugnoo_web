const express = require('express');
const router = express.Router();


const sports = require('./sports');
router.use('/sports', sports);

const news = require('./news');
router.use('/news', news);

const video = require('./video');
router.use('/video', video);

module.exports = router;
