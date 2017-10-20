const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  msg: String,
  date: Date
});

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = {
  Chat: Chat
};
