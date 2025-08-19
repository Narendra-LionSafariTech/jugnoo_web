const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },
    sender: {
        _id: { type: mongoose.Schema.Types.ObjectId, required: true },
        role: { type: String, enum: ["player", "coach", "academyOwner"], required: true }
    },
    receiver: {
        _id: { type: mongoose.Schema.Types.ObjectId, required: false },
        role: { type: String, enum: ["player", "coach", "academyOwner"], required: false }
    },
    messageType: { type: String, enum: ["text", "image", "video", "file", "system"], default: "text" },
    content: { type: String },
    attachments: [{ url: { type: String }, publicId: { type: String }, fileType: { type: String } }],
    status: { type: String, enum: ["sent", "delivered", "read"], default: "sent" },
    reaction: {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        emoji: { type: String }
    },
    replyTo: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },

    isEdited: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false });

const chatSchema = new mongoose.Schema({
    participants: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, required: true },
            role: { type: String, enum: ["player", "coach", "academyOwner"], required: true }
        }
    ],
    isGroupChat: { type: Boolean, default: false },
    chatName: { type: String },
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
}, { timestamps: true, versionKey: false });

const Message = mongoose.model("Message", messageSchema);
const Chat = mongoose.model("Chat", chatSchema);

module.exports = { Message, Chat };
