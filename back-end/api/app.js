var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const pool = require('./db'); // Import the database connection

// Add CORS middleware before other middleware
app.use(cors({
    origin: 'http://localhost:5174', // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Accept']
}));

// Middleware
app.use(logger('dev'));
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Parses URL-encoded bodies
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Test route for database connection
app.get('/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()'); // Query the current time
    res.json(result.rows[0]); // Send the result back as JSON
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Database connection failed');
  }
});

// Signup route
app.post('/signup', async (req, res) => {
  console.log('POST /signup route hit');
  console.log('Request body:', req.body); // Debugging log to ensure req.body is parsed

  const { email, password } = req.body; // Extract email and password from the request body

  try {
    // Insert the new user into the database
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [email, password]
    );

    // Respond with success
    res.status(201).json({
      message: 'User created successfully',
      user: { id: result.rows[0].id, email: result.rows[0].email },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Define a GET route that takes an email parameter in the URL
app.get('/login/:email', async (req, res) => {
    // Extract the email from the URL parameters
    const email = req.params.email;
    
    // Log for debugging purposes
    console.log('Fetching user data for email:', email);

    try {
        // Query the database:
        // - 'SELECT password': get only the password column
        // - 'FROM users': from the users table
        // - 'WHERE email = $1': find the row where email matches
        // - [email] is the value that replaces $1 in the query
        const result = await pool.query(
            'SELECT password FROM users WHERE email = $1',
            [email]
        );

        // If no user was found with this email
        if (result.rows.length === 0) {
            // Send a 404 (Not Found) status with an error message
            return res.status(404).json({ error: 'User not found' });
        }

        // If user was found, send back their password
        // result.rows[0].password gets the password from the first (and only) row
        res.json({ password: result.rows[0].password });

    } catch (err) {
        // If any error occurs during the process:
        // Log the error for debugging
        console.error(err.message);
        // Send a 500 (Server Error) status with an error message
        res.status(500).json({ error: 'Server error' });
    }
});

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
