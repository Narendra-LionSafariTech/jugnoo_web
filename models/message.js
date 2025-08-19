const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, default: '' },
  media: {
    type: {
      type: String, enum: ['image', 'gif', 'file', 'none'], default: 'none'
    },
    url: String
  },

  replyTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },

  reactions: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    emoji: {type:String}
  }],

  isSeen:{ type:Boolean, default:false},

  deliveredTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

}, {
  timestamps: true,
  versionKey: false
});

messageSchema.methods.markAsSeen = function(userId) {
  if (!this.seenBy.includes(userId)) {
    this.seenBy.push(userId);
    return this.save();
  }
};

module.exports = mongoose.model('Message', messageSchema);
