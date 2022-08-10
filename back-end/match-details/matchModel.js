const mongoose = require('mongoose')


const MatchDetailsSchema = new mongoose.Schema({
    stadium: {
        type: String
    },
    
    referee: {
        type: String
    },
    teams: [{
        type: mongoose.Types.ObjectId,
        ref: 'Team',
        required: true
    }],
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'UserApp',
        required: true
    },
    project: {
        type: mongoose.Types.ObjectId,
        ref: 'Project',
        required: true
    }
}, {timestamps: true})


module.exports = mongoose.model('Match', MatchDetailsSchema )