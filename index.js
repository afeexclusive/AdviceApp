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
app.use(express.static(__dirname+ "/UI"));
app.use(bodyParser.json());
// const dbConfig = require('./config/db.js');
const mongoose = require('mongoose');
const advices = require('./src/controller/Advice.js')
const advicereply = require('./src/controller/Advicereply.js')

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://0.0.0.0:27017/advice-app', {
    useNewUrlParser: true
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
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function(){
    console.log('Server is listening on port' + app.get('port'));
});

 app.post('/question', advices.create); // Create a new Advice
 app.get('/question', advices.findAll); // Retrieve all Notes
 app.get('/question/:questionId', advices.findOne);  // Retrieve a single Advice with adviceId
 app.get('/questioncat/:Id', advices.findCate); // Retrieve all reply in particular category
 app.put('/question/:questionId', advices.update);  // Update a Advice with adviceId
 app.post('/samehere/:sameId', advices.updateSame);
 app.delete('/question/:questionId', advices.delete);  // Delete a Advice with adviceId

 app.post('/advices', advicereply.create); // Create a new Advice
 app.get('/advices', advicereply.findAll); // Retrieve all Notes
 app.get('/advicereply/:Id', advicereply.findReply); //Retrieve all specific advice
 app.get('/advices/:Id', advicereply.findOne);  // Retrieve a single Advice with adviceId
 app.put('/advices/:Id', advicereply.update);  // Update a Advice with adviceId
 app.delete('/advices/:Id', advicereply.delete);  // Delete a Advice with adviceId