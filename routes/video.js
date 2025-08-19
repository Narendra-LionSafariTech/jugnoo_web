const express = require('express');
const router = express.Router();
const videoCtrl=require("../controllers/videoController")

router.post("/add", videoCtrl.addVideo);
router.get("/list", videoCtrl.getVideos);
router.get("/watch/:videoId", videoCtrl.getVideoById);

module.exports = router;
