const db = require('../models');

function getUser(req, res) {
  db.User.find({}, function(err, data) {
    if (err) {
      console.log('Error retrieving user from DB.', err);
      res.status(500).send('Internal server error');
    } else {
      res.json(data);
    }
  });
};

function createUser(req, res) {
  const newUser = db.User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    projects: req.body.projects
  });

  newUser.save(function(err, data) {
    if (err) {
      console.log('Error saving user to DB.', err);
      res.status(500).send('Internal server error');
    } else {
      res.status(201).json(data);
    }
  });
};

function findUserById(req, res) {
  db.User.findOne({_id: req.params.id }, function(err, data) {
    res.json(data);
  });
};

function changeUser(req, res) {
   db.User.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
    res.json(data);
  });
};

function deleteUser(req, res) {
  console.log('User deleted: ', req.params.id);
  db.User.findOneAndRemove({ _id: req.params.id })
    .exec(function (err, deletedUser) {
      res.json(deletedUser);
    });
  };

module.exports = {
  getUser: getUser,
  createUser: createUser,
  findUserById: findUserById,
  changeUser: changeUser,
  deleteUser: deleteUser
}
