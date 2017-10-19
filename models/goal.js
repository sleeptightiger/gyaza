const mongoose = require('mongoose');

const GoalsSchema = new mongoose.Schema({
  text: String,
  isComplete: Boolean,
  // isCompleted: String,
  // todo: String,
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  }
  // users: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User"
  // }]
});

const Goal = mongoose.model('Goal', GoalsSchema);

module.exports = {
  Goal: Goal
  };
