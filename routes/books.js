const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');

const booksController = require('../controllers/books');
const runValidation = require('../middleware/runValidation');

// KEEP AUTH IMPORT
// const ensureAuthenticated = require('../middleware/auth');  

const validateBook = require('../middleware/bookValidator');

// GET all books
router.get('/', booksController.getAll);

// GET one book
router.get(
  '/:id',
  [
    param('id')
      .isMongoId()
      .withMessage('Invalid book ID')
  ],
  runValidation,
  booksController.getSingle
);

// CREATE book — AUTH COMMENTED OUT
router.post(
  '/',
  // ensureAuthenticated,
  validateBook.create,
  runValidation,
  booksController.createBook
);

// UPDATE book — AUTH COMMENTED OUT
router.put(
  '/:id',
  // ensureAuthenticated,
  validateBook.update,
  runValidation,
  booksController.updateBook
);

// DELETE book — AUTH COMMENTED OUT
router.delete(
  '/:id',
  // ensureAuthenticated,
  [
    param('id')
      .isMongoId()
      .withMessage('Invalid book ID')
  ],
  runValidation,
  booksController.deleteBook
);

module.exports = router;
