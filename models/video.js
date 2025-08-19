const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    youtubeUrl: { type: String, required: true },
    thumbnail: { type: String },
    category: { type: String, enum: ["education", "sports", "general","vlog"], default: "education" },
    subCategory:{ type: [String], enum: [ "Nursery","Pre-Nursery","LKG","UKG","1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th","11th","12th","B.Tech","B.Sc","BCA","MCA","SSC","Railway","Bank","Civil","NEET","JEE","Pharmacist","NDA","UPSC","C-TET","TET","All",], default: "all" },
    allowedAges: { type: [Number], default: [] },
    allowAll: { type: Boolean, default: true },
    isPublic: { type: Boolean, default: true },
    tags: { type: [String], default: [] },
    
}, { timestamps: true, versionKey: false, });

module.exports = mongoose.model("Video", videoSchema);
