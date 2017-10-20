const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  msg: String
});

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = {
  Chat: Chat
};
