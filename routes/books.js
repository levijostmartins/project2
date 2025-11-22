const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');

const booksController = require('../controllers/books');
const runValidation = require('../middleware/runValidation');
// const ensureAuthenticated = require('../middleware/auth');

const validateBook = require('../middleware/bookValidator');


/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management CRUD
 */


/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of books
 */
router.get('/', booksController.getAll);


/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get a single book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book data
 *       404:
 *         description: Book not found
 */
router.get(
  '/:id',
  [param('id').isMongoId().withMessage('Invalid book ID')],
  runValidation,
  booksController.getSingle
);


/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Validation error
 */
router.post(
  '/',
  // ensureAuthenticated,
  validateBook.create,
  runValidation,
  booksController.createBook
);


/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book updated
 *       404:
 *         description: Book not found
 */
router.put(
  '/:id',
  // ensureAuthenticated,
  validateBook.update,
  runValidation,
  booksController.updateBook
);


/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted
 *       404:
 *         description: Book not found
 */
router.delete(
  '/:id',
  // ensureAuthenticated,
  [param('id').isMongoId().withMessage('Invalid book ID')],
  runValidation,
  booksController.deleteBook
);


module.exports = router;
