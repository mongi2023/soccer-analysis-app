const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'You have to enter the name of the team'],
      unique: true,
    },
    creation_date: {
      type: Date,
      required: [true, 'You need to enter the creation date of the team'],
    },
    logo: {
      type: String,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'UserApp',
      required: true
    },
    project: {
      type: mongoose.Types.ObjectId,
      ref: 'Project',
      required: true
  },
  },
  { timestamps: true, toJSON:{virtuals: true}, toObject: {virtuals: true} }
  );
  
  TeamSchema.virtual('players', {
    ref: 'Player',
    localField: '_id',
    foreignField: 'team',
    justOne: false
  })
module.exports = mongoose.model('Team', TeamSchema);
