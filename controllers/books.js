const bookService = require('../services/bookService');

exports.getAll = async (req, res, next) => {
  try {
    const books = await bookService.findAll();
    res.json(books);
  } catch (err) {
    next(err);
  }
};

exports.getSingle = async (req, res, next) => {
  try {
    const book = await bookService.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    next(err);
  }
};

exports.createBook = async (req, res, next) => {
  try {
    const created = await bookService.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: 'Duplicate key',
        details: err.keyValue
      });
    }
    next(err);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const updated = await bookService.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const deleted = await bookService.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted' });
  } catch (err) {
    next(err);
  }
};
