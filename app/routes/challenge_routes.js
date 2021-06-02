// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples
// const Team = require('../models/team')
const Challenge = require('../models/challenge')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// CREATE
// POST /teams
// router.post('/challenge/:id', requireToken, (req, res, next) => {
// create a challenge

router.post('/challenges', requireToken, (req, res, next) => {
  // set owner of new example to be current user
  console.log(req.body.challenge)
  req.body.challenge.owner = req.user.id

  Challenge.create(req.body.challenge)
    // respond to succesful `create` with status 201 and JSON of new "example"
    .then(challenge => {
      res.status(201).json({ challenge: challenge.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

router.get('/challenges', requireToken, (req, res, next) => {
  // const owner = req.user._id
  Challenge.find()
    .populate('owner', 'email')
    .populate('hometeam', 'name')
    .populate('awayteam', 'name')
    .then(challenges => {
      // `examples` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return challenges.map(challenge => challenge.toObject())
    })
    // respond with status 200 and JSON of the examples
    .then(challenges => res.status(200).json({ challenges: challenges }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
