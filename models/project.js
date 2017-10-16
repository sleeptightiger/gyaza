const mongoose = require('mongoose');

const GoalsSchema = new mongoose.Schema({
  description: String,
  voteToActive: Boolean,
  voteToComplete: Boolean
});

const ProjectSchema = new mongoose.Schema({
  name: String,
  contributors: [{
    type: mongoose.Schema.ObjectId,
    ref: "User"
  }],
  description: String,
  completed: Boolean,
  goals: [GoalsSchema],
  chat: String //TODO: figure out how to create a chat schema
});

const Goal = mongoose.model('Goal', GoalsSchema);
const Project = mongoose.model('Project', ProjectSchema);

module.exports = {
  Goal: Goal,
  Project: Project
};
