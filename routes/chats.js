const db = require('../models');

function getChat(req, res) {
  db.Chat.find({}, function(err, data) {
    if (err) {
      console.log('Error retrieving chat from DB.', err);
      res.status(500).send('Internal server error');
    } else {
      res.json(data);
    }
  });
}

function createChat(req, res) {
  const newChat = db.Chat({
    msg: req.body.msg,
    date: req.body.date
  });

  newChat.save(function(err, data) {
    if (err) {
      console.log('Error saving chat to DB.', err);
      res.status(500).send('Internal server error');
    } else {
      res.status(201).json(data);
    }
  });
};

function findChatById(req, res) {
  db.Chat.findOne({_id: req.params.id }, function(err, data) {
    res.json(data);
  });
};

function changeChat(req, res) {
   db.Chat.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
    res.json(data);
  });
};

function deleteUser(req, res) {
  console.log('Chat deleted: ', req.params.id);
  db.Chat.findOneAndRemove({ _id: req.params.id })
    .exec(function (err, deletedChat) {
      res.json(deletedChat);
    });
  };

module.exports = {
  getChat: getChat,
  createChat: createChat,
  findChatById: createChat,
  changeChat: createChat,
  deleteChat: createChat
}
