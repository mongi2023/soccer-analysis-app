const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'You need to specify the name of your project'],
        unique: true
    },
    description: {
        type: String,
        maxlength: 250,
    },
    path: {
        type: String,
        
    },

}, {timestamps: true})


module.exports = mongoose.model('Project', ProjectSchema)