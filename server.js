require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('cookie-session');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./config/db');

// Routers
const indexRouter = require('./routes/index');

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Session for passport
app.use(
  session({
    name: 'session',
    keys: [process.env.SESSION_SECRET || 'sessionsecret'],
    maxAge: 24 * 60 * 60 * 1000
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// ===== Swagger-Autogen CONFIG =====
const swaggerDocument = require('./swagger.json');

// Serve swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API Routes
app.use('/api', indexRouter);

// Healthcheck
app.get('/', (req, res) => res.json({ message: 'Library Bookstore API' }));

// Error middleware
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
