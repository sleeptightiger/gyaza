const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  created: Date,
  content: String,
  userName: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  project: {
    type: mongoose.Schema.ObjectId,
    red: "Project"
  }
});

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = {
  ChatSchema: ChatSchema
};
