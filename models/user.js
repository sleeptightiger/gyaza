const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  projects: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Project'
  }]
});

const User = mongoose.model('User', UserSchema);

module.exports = {
  User: User
};
