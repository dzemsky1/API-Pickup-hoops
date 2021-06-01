const mongoose = require('mongoose')
const teamSchema = require('./team')

const challengeSchema = new mongoose.Schema({
  hometeam: [teamSchema],
  awayteam: [teamSchema],
  winner: [teamSchema]
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  location: {
    type: String
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Challenge', challengeSchema)
