const mongoose = require('mongoose')

const challengeSchema = new mongoose.Schema({
  hometeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  awayteam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  loser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    type: String
  },
  accepted: {
    type: Boolean
  },
  finished: {
    type: Boolean
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Challenge', challengeSchema)
