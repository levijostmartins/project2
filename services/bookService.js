const Book = require('../models/Book');

// Get all books
exports.findAll = async () => {
  return await Book.find().lean();
};

// Get single book by ID
exports.findById = async (id) => {
  return await Book.findById(id).lean();
};

// Create a new book
exports.create = async (data) => {
  return await Book.create(data);
};

// Update a book by ID
exports.update = async (id, data) => {
  return await Book.findByIdAndUpdate(
    id,
    data,
    { new: true, runValidators: true }
  ).lean();
};

// Delete a book by ID
exports.remove = async (id) => {
  return await Book.findByIdAndDelete(id).lean();
};
