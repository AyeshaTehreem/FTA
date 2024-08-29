const createError = require('http-errors');
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

// Import routes
const authRoutes = require('./routes/auth');

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

// MongoDB connection
mongoose.connect(mongoUri)
.then(() => console.log('Successful connection to MongoDB'))
  .catch((err) => console.error('Error occurred in connecting to MongoDB', err));

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

// Session setup
app.use(
  session({
    secret: process.env.JWT_SECRET || 'your_jwt_secret_key', // Using JWT_SECRET as session secret
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: mongoUri }),
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Use routes
app.use('/auth', authRoutes);

// Error handling
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.json({ error: err.message });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;
