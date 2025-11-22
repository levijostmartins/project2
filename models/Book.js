const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  publisher: { type: String },
  publishedDate: { type: Date },
  genre: { type: String },
  pages: { type: Number },
  language: { type: String },
  price: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

BookSchema.pre('save', function () {
  this.updatedAt = Date.now();
});

module.exports = mongoose.model('Book', BookSchema);
