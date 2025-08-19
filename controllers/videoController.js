const Video = require("../models/video");

exports.addVideo = async (req, res) => {
  try {
    const { title, description, youtubeUrl, thumbnail, category,subCategory, allowedAges, allowAll,isPublic,tags } = req.body;
    const newVideo = new Video({title,description,youtubeUrl,thumbnail,category,subCategory,allowedAges,allowAll,isPublic,tags });
    await newVideo.save();
    res.status(201).json({ success: true,message:"Video Uploaded successfully", video: newVideo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
};

exports.getVideos = async (req, res) => {
  try {
    const userAge = parseInt(req.query.age || 5);

    const videos = await Video.find({
      $or: [
        { allowAll: true },
        { allowedAges: { $in: [userAge] } }
      ]
    });

    res.status(200).json({message:"Video retrive successfully", videos});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
};

exports.getVideoById = async (req, res) => {
  try {
    const {videoId}=req.params
    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ success: false, message: "Video not found" });
    res.status(200).json({message:"Video found successfully", video});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
};
