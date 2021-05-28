const express  = require('express');
const Exercises = require('../models/Exercises');
const router = express.Router();
const fs = require('fs');
const jwt = require('jsonwebtoken');
const { request } = require('http');


// MY ROUTES
// 
router.get('/',isAuthenticated, async (req, res) =>{
    const exercises = await Exercises.find();

    res.json(exercises);
});

//Create New Exercise
router.post('/exercises', isAuthenticated, async (req, res) => {
    const NewExercise = new Exercises(req.body);
    const savedExercises = await NewExercise.save();

    res.json(savedExercises);
});

// Get Exercise by id
router.get('/get/:id', isAuthenticated, async (req, res) =>{
    const q = await Exercises.findById({_id: req.params.id})

    res.json(q);
});


// Delete quote
router.delete('/delete/:id', isAuthenticated, async (req, res) =>{
    const results = await Exercises.findByIdAndDelete({_id: req.params.id});

    res.json(results);
});


//Update a Quote
router.patch('/update/:id', isAuthenticated, async (req, res) =>{
    const update = await Exercises.updateOne({_id: req.params.id}, {$set:req.body});

    res.json(update);
})


//Generating the token 
router.get('/jwt', (req, res) => {

    let privateKey = fs.readFileSync('./token.pem', 'utf8');
    
    //generating the token
    let token = jwt.sign({ "body": "stuff" }, privateKey, { algorithm: 'HS256'});
    
    //whenever this endpoint is hit, send this web token
    res.send(token);
    
    });



    //checks if the token was using the pem file we have
function isAuthenticated(req, res, next) {
    //checks if hearder is defined or not
    if (typeof req.headers.authorization !== "undefined") {

        let token = req.headers.authorization.split(" ")[1];
        let privateKey = fs.readFileSync('./token.pem', 'utf8');
    
        jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {
    
    // if there has been an error...
        if (err) {
    // shut them out!
            res.status(500).json({ error: "Not Authorized" });
            throw new Error("Not Authorized");
        }
    
    // if the JWT is valid, allow them to hit
    
    // the intended endpoint
            return next();
        });
    
    } else {
        res.status(500).json({ error: "Not Authorized" });
        throw new Error("Not Authorized");
    
    }
    
    }

module.exports = router;
