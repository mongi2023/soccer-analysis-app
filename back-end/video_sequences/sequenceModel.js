const mongoose = require('mongoose')


const SequenceSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'Please provide a name for your sequence'],
    },
    start_time: {
        type: String,
        required: [true, 'Please provide the start time of your sequence'],
    },
    end_time: {
        type: String,
        required: [true, 'Please provide the end time of your sequence']
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'ActionCategory',
        required: true
    },
    subCategory: {
        type: mongoose.Types.ObjectId,
        ref: 'ActionSubCategory',
        required: true,
    },
    player: [{
        type: mongoose.Types.ObjectId,
        ref: 'Player',
        required : true,
    }],
    original_video: {
        type: mongoose.Types.ObjectId,
        ref: 'Video',
        // required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'UserApp',
        required: true
    }

}, {timestamps: true})


module.exports = mongoose.model('Sequence', SequenceSchema)