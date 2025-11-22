const { body, param } = require('express-validator');

exports.create = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isString().withMessage('Title must be a string'),

  body('author')
    .trim()
    .notEmpty().withMessage('Author is required')
    .isString().withMessage('Author must be a string'),

  body('isbn')
    .trim()
    .notEmpty().withMessage('ISBN is required')
    .isString().withMessage('ISBN must be a string'),

  body('publisher').optional().isString(),
  body('publishedDate').optional().isISO8601().withMessage('Invalid date'),
  body('genre').optional().isString(),
  body('pages').optional().isInt({ min: 1 }).withMessage('Pages must be a positive number'),
  body('language').optional().isString(),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be >= 0'),
  body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be >= 0'),
];

exports.update = [
  param('id').isMongoId().withMessage('Invalid book ID'),

  body('title').optional().isString(),
  body('author').optional().isString(),
  body('isbn').optional().isString(),
  body('publisher').optional().isString(),
  body('publishedDate').optional().isISO8601(),
  body('genre').optional().isString(),
  body('pages').optional().isInt({ min: 1 }),
  body('language').optional().isString(),
  body('price').optional().isFloat({ min: 0 }),
  body('stock').optional().isInt({ min: 0 }),
];
