const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // the Middleware
const Exercises = require('./models/Exercises');

const app = express();

//Database Library
mongoose.connect('mongodb://localhost/motivation',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db = mongoose.connection;

db.once('open',() => {
    console.log('connecting to database...');
});

// MIDDLEWARE
app.use(bodyParser.json());

//Routes
app.get('/', (req, res) =>{
    res.send("do exercises");
});



const ExercisesRoutes = require('./routes/Exercises');
app.use('/api.workout.com/v1', ExercisesRoutes);

//Starting the server
app.listen(8001, console.log("listenning to port 8001"));
