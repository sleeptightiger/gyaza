// dependencies

var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    session = require('express-session'),
    passport = require('passport');


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

require('./config/passport')(passport);

//routes for user
app.get('/newUser', userRoutes.getUser);
app.post('/newUser', userRoutes.createUser);
app.get('/newUser/:id', userRoutes.findUserById);
app.put('/newUser/:id', userRoutes.changeUser);
app.delete('/newUser/:id', userRoutes.deleteUser);

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
