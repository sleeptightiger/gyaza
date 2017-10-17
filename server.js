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
//runs the auth-routes.js
require('./routes/auth-routes')(app, passport);

mongoose.connection.openUri(process.env.DB_CONN);

const userRoutes = require('./routes/users'),
      chatRoutes = require('./routes/chats'),
      projectRoutes = require('./routes/projects');

// //signup route with placeholder
app.get('/signup', function (req, res) {
  res.render('../views/signup');
});

app.get('/login', function (req, res) {
  res.render('../views/login');
});

// app.get('/portal', function (req, res) {
//   res.render('../views/project-portal');
// });

// app.get('/project', function (req, res) {
//   res.render('../views/project-page');
// });

// app.get('/profile', function (req, res) {
//   res.render('../views/profile');
// });


//log route with placeholder
app.get('/', function (req, res) {
  res.render('../views/login');
});

//runs the auth-routes.js
require('./routes/auth-routes')(app, passport);

require('./config/passport')(passport);

//routes for user
app.get('/newUser', userRoutes.getUser);
app.post('/newUser', userRoutes.createUser);
app.get('/newUser/:id', userRoutes.findUserById);
app.put('/newUser/:id', userRoutes.changeUser);
app.delete('/newUser/:id', userRoutes.deleteUser);

//adding render route for portal
app.get('/portal/:userName', function(req, res) {
    console.log('req.params.userName: ' + req.params.userName);
    db.User.findOne({username: req.params.userName }, function(err, data) {
      res.render('../views/project-portal', {username: username});
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
app.listen(port, function(err) {
  if (err) {
    console.log(`Error starting server on port ${port}`, err);
  } else {
    console.log(`Server running on port ${port}.`);
  }
});
