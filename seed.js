const mongoose = require('mongoose');
const db = require('./models');


// remove all records that match {} -- which means remove ALL records
// db.User.remove({}, function(err, users){
//   if(err) {
//     console.log('Error occurred in remove', err);
//   } else {
//     console.log('removed all users');
//   }
// });
// db.Project.remove({}, function(err, projects){
//   if(err) {
//     console.log('Error occurred in remove', err);
//   } else {
//     console.log('removed all projects');
//   }
// });


let user1 = db.User({
  firstName: "Gerry",
  lastName: "Morales Meza",
  userName: "gerBear",
  email: "sleep.tiger2@gmail.com",
  projects: []
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
  email: "c.simecheck89@yahoo.com",
  projects: []
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
  email: "sophia.t.chow@gmail.com",
  projects: []
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

const project2 = db.Project({
  name: "Second Project",
  contributors: [user1],
  description: "this is the second one",
  completed: false,
  goals: [],
  chat: "Chats go here"
});


project2.save(function(err, savedProject2) {

  if(err) {
      console.log('WHO MOVED MY Project?');
  } else {
      console.log('My Project is safe.', savedProject2);
  }

});

//process.exit();

//
// //console.log("userName: " + user1.userName);
// db.User.findOneAndUpdate({userName: "gerBear"}, {projects: [project1]}, function (err, foundUser) {
//   if (err) {
//     console.log(err);
//   }else {
//     console.log("PROJECT ADDEDDDDD!!!!!")
//   }
// });
