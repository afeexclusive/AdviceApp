const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Headers, Accept");
    req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Headers, Accept");
    next();
  });

// parse requests of content-type - application/json
app.use(bodyParser.json())
const dbConfig = require('./config/db.js');
const mongoose = require('mongoose');
const advices = require('./src/controller/Advice.js')
const advicereply = require('./src/controller/Advicereply.js')

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Advice App, drop an advice here on any issue you might save a life unknown to you."});
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

 app.post('/question', advices.create); // Create a new Note
 app.get('/question', advices.findAll); // Retrieve all Notes
 app.get('/question/:questionId', advices.findOne);  // Retrieve a single Note with noteId
 app.put('/question/:questionId', advices.update);  // Update a Note with noteId
 app.delete('/question/:questionId', advices.delete);  // Delete a Note with noteId

 app.post('/advices', advicereply.create); // Create a new Note
 app.get('/advices', advicereply.findAll); // Retrieve all Notes
 app.get('/advices/:adviceId', advicereply.findOne);  // Retrieve a single Note with noteId
 app.put('/advices/:adviceId', advicereply.update);  // Update a Note with noteId
 app.delete('/advices/:adviceId', advicereply.delete);  // Delete a Note with noteId