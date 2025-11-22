const mongoose = require('mongoose');

module.exports = function connectDB() {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI || '';

  if (!uri) {
    console.error('MONGO_URI or MONGODB_URI not set. Please update .env');
    process.exit(1);
  }

  mongoose.set('strictQuery', false);

  return mongoose
    .connect(uri) 
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
      console.error('MongoDB connection error:', err.message);
      process.exit(1);
    });
};
