// dependencies
const express = require('express');
const bodyParser = require('body-parser');
//const model = require('./models')

// app config
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

// app routes
// you can add route handlers directly in this file like this:
app.get('/', function(req, res) {
  res.json({
    message: 'Welcome to Gyaza!!',
    type: 'greeting',
    time: new Date()
  });
});


// start app
app.listen(port, function(err) {
  if (err) {
    console.log(`Error starting server on port ${port}`, err);
  } else {
    console.log(`Server running on port ${port}.`);
  }
});
