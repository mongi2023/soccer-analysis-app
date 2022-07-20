const mongoose = require('mongoose')


const PlayerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'You have to enter the fullname of the player'],
        unique: true
    },
    birth_date: {
        type: Date,
        required: [true, 'You have to enter the birth date of the player']
    },
    number: {
        type: Number,
        required: [true, 'You have to enter the player number'],
        unique: true
    },
    picture: {
        type: String,
        required: [true, 'you have to add the picture of the player']
    },
    position: {
        type: String,
        required: [true, 'You have to enter the position of the player']
    },
    team: {
        type: mongoose.Types.ObjectId,
        ref: 'Team',
        required: [true, 'You have to enter the team of the player']
    }
}, {timestamps:true})


module.exports = mongoose.model('Player', PlayerSchema)