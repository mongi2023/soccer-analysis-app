const mongoose = require('mongoose')


const VideoSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'You should specify the name of your file']
    },
    size: {
        type: String,
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
    duration : {
        type: String
    },
    path: {
        type: String
    },
    origin: {
        type: String,
        required: [true, 'You should define the origin of your file']
    },
    project: {
        type: mongoose.Types.ObjectId,
        ref: 'Project',
        required: [true, 'You need to specify the project, where the file is belong']
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'UserApp',
        required: true
    }
}, {timestamps:true
    , toJSON: {virtuals: true}, toObject: {virtuals: true}
})
VideoSchema.virtual('videoSequences', {
    ref: 'Sequence',
    localField: '_id',
    foreignField: 'original_video',
    justOne: false
})
module.exports = mongoose.model('Video', VideoSchema)