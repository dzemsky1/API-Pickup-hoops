const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  members: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  games: {
    type: Number
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Team', teamSchema)
