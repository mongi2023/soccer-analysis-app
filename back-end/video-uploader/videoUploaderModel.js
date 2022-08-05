const mongoose = require('mongoose')


const VideoSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'You should specify the name of your file']
    },
    size: {
        type: Number,
        required: [true, 'The size of the file is important']
    },
    resolution: {
        type: String,
        required: [true, 'Resolution of the video is important']
    },
    extension: {
        type: String,
        required: [true, 'Extension is important']
    },
    origin: {
        type: String,
        required: [true, 'You should define the origin of your file']
    },
    projectID: {
        type: mongoose.Types.ObjectId,
        ref: 'Project',
        required: [true, 'You need to specify the project, where the file is belong']
    }
}, {timestamps:true})

module.exports = mongoose.model('Video', VideoSchema)