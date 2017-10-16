onst mongoose = require('mongoose');
const db = require('./models');

const user1 = db.User({
  firstName: "Gerry",
  lastName: "Morales Meza",
  userName: "gerBear",
  email: "sleep.tiger2@gmail.com",
  projects: [project1]

});

user1.save(function(err, savedUser) {
    if(err) {
        console.log('WHO MOVED MY Gerry?');
    } else {
        console.log('My Gerry is safe.', savedUser);
    }
});

const user2 = db.User({
  firstName: "Carrington",
  lastName: "Simecheck",
  userName: "careBear",
  email: "c.simecheck89@yahoo.com"
  projects: [project1]
});

user2.save(function(err, savedUser) {
    if(err) {
        console.log('WHO MOVED MY Carrington?');
    } else {
        console.log('My Carrington is safe.', savedUser);
    }
});

const user3 = db.User({
  firstName: "Sophia",
  lastName: "Chow",
  userName: "sofaBear",
  email: "sophia.t.chow@gmail.com"
  projects: [project1]
});

user3.save(function(err, savedUser) {
    if(err) {
        console.log('WHO MOVED MY Sophia?');
    } else {
        console.log('My Sophia is safe.', savedUser);
    }
});

const goal1 = db.Goal({
  description: "Something to do"
});

const project1 = db.Project({
  name: "First Project",
  contributors: [user1, user2, user3],
  description: "this is the first one",
  completed: false,
  goals: [goal1],
  chat: "Chats go here"
});

project1.save(function(err, savedProject) {
  if(err) {
      console.log('WHO MOVED MY Project?');
  } else {
      console.log('My Project is safe.', savedProject);
  }
});
