const mongoose = require('mongoose');

const ExercisesSchema = new mongoose.Schema({
    name: String,
    description: String,
    muscles_worked: String
});

module.exports = mongoose.model('Exercises', ExercisesSchema);
