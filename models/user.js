const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new mongoose.Schema({
  local: {
    userName: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    },
    email: String
  },

  github: {
    userName: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    }
  },

  projects: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Project'
  }]
});

//generate hash
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(bcrypt.genSaltSync(8), null);
};
//check password validity
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = {
  User: User
};
