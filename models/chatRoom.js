const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    isGroupChat: {type: Boolean,default: false,},
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    lastMessage: { type: String },
    unseenCount: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        count: { type: Number, default: 0 }
    }],
}, { timestamps: true, versionKey: false, });

module.exports = mongoose.model('Chat', chatSchema);
