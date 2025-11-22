// routes/users.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

const usersController = require('../controllers/users');  // FIXED

// Google OAuth start
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/api/users/auth/failure' }),
  (req, res) => usersController.issueJwt(req, res)
);

// OAuth Failure
router.get('/auth/failure', (req, res) =>
  res.status(401).json({ message: 'OAuth Failed' })
);

// Logged-in user's profile
router.get('/profile', usersController.getProfile);

// Get all users
router.get('/', usersController.getAll);

module.exports = router;
