// dependencies
var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    session = require('express-session'),
    passport = require('passport');
    db = require('./models');

// app config
const app = express();
const port = process.env.PORT || 3000;
app.use(cookieParser());
app.set('views', './views');
app.set('view engine', 'ejs');
require('dotenv').config();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
require('dotenv').config();
app.use(express.static('./public'));
app.use(session({secret: 'bearden'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));

var http = require('http').Server(app);
var io = require('socket.io')(http);

mongoose.connection.openUri(process.env.DB_CONN);

//runs the auth-routes.js
require('./routes/auth-routes')(app, passport);
require('./config/passport')(passport);

const userRoutes = require('./routes/users'),
      chatRoutes = require('./routes/chats'),
      projectRoutes = require('./routes/projects');

app.get('/project/:projectId', function (req, res) {
  db.Project.findOne({_id: req.params.userId }, function(err, data) {
    res.render('../views/project-page');
  });

});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

//routes for user
app.get('/newUser', userRoutes.getUser);
app.post('/newUser', userRoutes.createUser);
app.get('/newUser/:id', userRoutes.findUserById);
app.put('/newUser/:id', userRoutes.changeUser);
app.delete('/newUser/:id', userRoutes.deleteUser);

//adding render route for portal
app.get('/portal/:userId', function(req, res) {

    let bears = ['chinese-panda-bear', 'bear-face', 'google-panda-circular-symbol'];
    var bear = bears[Math.floor(Math.random()*bears.length)];
    var project = {};
    var name = '';
    db.User.findOne({_id: req.params.userId }, function(err, data) {
        var array = [];
        var userId = req.params.userId;
        var userName = data.local.userName;
        var length = data.projects.length;
        console.log(length);
        let count = 0;
        if (length != 0) {
          for(var i = 0; i < length; i++){
            console.log("I'm in the loop!!");
            bear = bears[Math.floor(Math.random()*bears.length)];
            db.Project.findOne({_id: data.projects[i] }, function(err, data2) {
              count++;
              var project = new db.Project({
                name: data2.name,
                description: data2.description,
                isComplete: data2.completed
              });
              array.push(project);

              if(count == length) {

                res.render('project-portal', {
                userName: userName,
                userId: userId,
                projects: array,
                bear: bear
                });
              }


            });

          };

      } else {
        res.render('project-portal', {
        userName: userName,
        userId: userId,
        projects: [],
        bear: bear
        });
      }
      });
   });

app.post('/portal/:userId', function(req, res) {
  let cont = req.body.contributors;
  //TODO takin multiple contributors
  const newProject = db.Project({
    name: req.body.name,
    contributors: req.param.userId,
    description: req.body.description
  });

  newProject.save(function(err, data) {
    if (err) {
      console.log('Error saving project to DB.', err);
      res.status(500).send('Internal server error');
    } else {
      ///re-render page
      console.log("userId: " + req.params.userId);
      db.User.findOne({_id: req.params.userId }, function(err, data2) {
        //res.json(data);
        //console.log("NEWPROJECT: " + newProject._id);
        data2.projects.push(newProject);
        //let newProjects = data2.projects;
        console.log("data2.projects: " + data2.projects);
        db.User.findByIdAndUpdate(req.params.userId, { projects: data2.projects}, function (err, data3) {
          let bears = ['chinese-panda-bear', 'bear-face', 'google-panda-circular-symbol'];
          var bear = bears[Math.floor(Math.random()*bears.length)];
          var project = {};
          var name = '';
          db.User.findOne({_id: req.params.userId }, function(err, data4) {
            var array = [];
            var userId = req.params.userId;
            var userName = data4.local.userName;
            var length = data4.projects.length;
            let count = 0;
            for(var i = 0; i < length; i++){
              bear = bears[Math.floor(Math.random()*bears.length)];
              db.Project.findOne({_id: data4.projects[i] }, function(err, data5) {
                count++;
                var project = new db.Project({
                  name: data5.name,
                  description: data5.description,
                  isComplete: data5.completed
                });
                array.push(project);

                if(count == length) {
                  console.log(array);
                  res.render('project-portal', {
                  userName: userName,
                  userId: userId,
                  projects: array,
                  bear: bear
                  });
                };
              });
            };
          });
        });
      });
    };
  });
});

//Routes for projects
app.get('/newProject', projectRoutes.getProject);
app.post('/newProject', projectRoutes.createProject);
app.get('/newProject/:id', projectRoutes.findProjectById);
app.put('/newProject/:id', projectRoutes.changeProject);
app.delete('/newProject/:id', projectRoutes.deleteProject);

//Routes for goals
app.get('/newGoal', projectRoutes.getGoal);
app.post('/newGoal', projectRoutes.createGoal);
app.get('/newGoal/:id', projectRoutes.findGoalById);
app.put('/newGoal/:id', projectRoutes.changeGoal);
app.delete('/newGoal/:id', projectRoutes.deleteGoal);

//Routes for chats
app.get('/newChat', chatRoutes.getChat);
app.post('/newChat', chatRoutes.createChat);
app.get('/newChat/:id', chatRoutes.findChatById);
app.put('/newChat/:id', chatRoutes.changeChat);
app.delete('/newChat/:id', chatRoutes.deleteChat);

http.listen(3000, function(){
  console.log('listening on *:3000');
});
