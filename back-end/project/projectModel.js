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
    project_path: {
        type: String,
        required: [true, 'please provide the path to create a project'],
    },
    user : {
        type: mongoose.Types.ObjectId,
        ref: 'UserApp',
        required: true,
        select: false
    },

}, {timestamps: true})


module.exports = mongoose.model('Project', ProjectSchema)