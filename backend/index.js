const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const createError = require('http-errors');

// Import routes
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');
const categoryRoutes = require('./routes/category');
const feedbackRoutes = require('./routes/feedback');
const tagRoutes = require('./routes/tag');
const verificationRoutes = require('./routes/verification');

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

app.use(cors({
  origin: 'http://localhost:3000', // Ensure this matches your frontend URL
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true // Allow credentials (cookies) to be sent
}));

app.use(
  session({
    secret: process.env.JWT_SECRET || 'your_jwt_secret_key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: mongoUri }),
    cookie: {
      secure: process.env.NODE_ENV === 'production', // Use true in production with HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax' // Adjust based on your environment
    },
  })
);

// Use routes
app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);
app.use('/categories', categoryRoutes);
app.use('/feedbacks', feedbackRoutes);
app.use('/tags', tagRoutes);
app.use('/verifications', verificationRoutes);

// Error handling for 404
app.use((req, res, next) => {
  next(createError(404));
});

// General error handling
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({ error: err.message });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;
