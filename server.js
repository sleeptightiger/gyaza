// dependencies

var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    session = require('express-session'),
    passport = require('passport'),
    db = require('./models'),
    http = require('http').Server(express),
    io = require('socket.io')(http);

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
//runs the auth-routes.js
require('./routes/auth-routes')(app, passport);
require('./config/passport')(passport);

mongoose.connection.openUri(process.env.DB_CONN);

const userRoutes = require('./routes/users'),
      chatRoutes = require('./routes/chats'),
      projectRoutes = require('./routes/projects');

//CHAT BOX
app.get('/project-page', function(req, res){
  res.sendFile(__dirname + './views/project-page.ejs');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

//

app.get('/portal', function (req, res) {
  res.render('../views/project-portal');
});

app.get('/project', function (req, res) {
  res.render('../views/project-page');
});

app.get('/profile', function (req, res) {
  res.render('../views/profile');
});


//log route with placeholder
app.get('/', function (req, res) {
  res.render('../views/login');
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

        //res.render('../views/project-portal');
        console.log(data.projects);
        data.projects.forEach(function (projectData) {

          db.Project.findOne({_id: projectData }, function(err, data2) {

            var project = new db.Project({
              name: data2.name,
              description: data2.description,
              isComplete: data2.completed
            });
            console.log(data.projects);
            res.render('project-portal', {
            userName: data.local.userName,
            userId: req.params.userId,
            projects: data.projects,
            projectName: project.name,
            projectDescription: project.description,
            projectIsCompleted: project.isComplete,
            bear: bear
            });


          });

        });



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

//start app

// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });

app.listen(port, function(err) {
  if (err) {
    console.log(`Error starting server on port ${port}`, err);
  } else {
    console.log(`Server running on port ${port}.`);
  }
});
