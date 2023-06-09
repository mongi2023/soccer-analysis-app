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
  },
  { timestamps: true }
);

module.exports = mongoose.model('Team', TeamSchema);
