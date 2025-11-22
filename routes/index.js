// routes/index.js
const express = require('express');
const router = express.Router();
const swagger = require('./swagger')
const booksRouter = require('./books');
const usersRouter = require('./users');

// API root
router.get('/', (req, res) => {
  res.json({ message: 'API root' });
});

// Route groups
router.use('/books', booksRouter);
router.use('/users', usersRouter);
router.use('/', require('./swagger'));
module.exports = router;
