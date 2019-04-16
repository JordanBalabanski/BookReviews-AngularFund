const express = require('express')
const passport = require('passport')
const validator = require('validator')

const User = require('../models/User')

const router = new express.Router()

function validateSignupForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  // if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
  //   isFormValid = false
  //   errors.email = 'Please provide a correct email address.'
  // }

  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    isFormValid = false
    errors.username = 'Please provide a correct username.'
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 3) {
    isFormValid = false
    errors.password = 'Password must have at least 3 characters.'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

function validateLoginForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    isFormValid = false
    errors.username = 'Please provide your username.'
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 3) {
    isFormValid = false
    errors.password = 'Incorrect password.'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

router.get('/getUser/:username', (req, res) => {
  const { username } = req.params;
  User.find({username}).then((user) => {
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No such user.'
      })
    }

    return res.status(200).json(user);
  })
})

router.post('/register', (req, res, next) => {
  const validationResult = validateSignupForm(req.body)
  if (!validationResult.success) {
    return res.status(401).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  return passport.authenticate('local-signup', (err) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: err
      })
    }

    return res.status(200).json({
      success: true,
      message: 'You have successfully signed up! Now you should be able to log in.'
    })
  })(req, res, next)
})

router.post('/login', (req, res, next) => {
  const validationResult = validateLoginForm(req.body)
  if (!validationResult.success) {
    return res.status(401).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        console.log('Invalid credentials');
        return res.status(401).json({
          success: false,
          message: err.message
        })
      }

      return res.status(401).json({
        success: false,
        message: 'Could not process the form.'
      })
    }

    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: userData
    })
  })(req, res, next)
})

module.exports = router
