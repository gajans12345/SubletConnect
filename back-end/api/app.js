var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcrypt');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const pool = require('./db'); // Import the database connection

// Session configuration
app.use(session({
  secret: 'your-secret-key', // Change this to a secure secret
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Add CORS middleware before other middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Your frontend URLs
    credentials: true
}));

// Middleware
app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

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

// Simple test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!', timestamp: new Date().toISOString() });
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

// Authentication middleware
const authenticateUser = (req, res, next) => {
  console.log('Session:', req.session);
  console.log('User ID in session:', req.session?.userId);
  
  if (!req.session || !req.session.userId) {
    console.log('Authentication failed - no session or userId');
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  req.user = { id: req.session.userId };
  console.log('User authenticated:', req.user);
  next();
};

// Add a route to check authentication
app.get('/api/check-auth', authenticateUser, (req, res) => {
  res.json({ 
    authenticated: true, 
    userId: req.user.id 
  });
});

// Get all listings
app.get('/api/listings', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM listings ORDER BY created_at DESC');
        console.log('Sending listings:', result.rows); // Debug log
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching listings:', error);
        res.status(500).json({ error: 'Failed to fetch listings' });
    }
});

// Create a new listing
app.post('/api/listings', async (req, res) => {
  try {
    const { title, description, location, rent, duration, image, userEmail, details } = req.body;
    
    console.log('Creating listing with data:', req.body); // Debug log

    const result = await pool.query(
      'INSERT INTO listings (title, description, location, rent, duration, image, user_email, details) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [title, description, location, rent, duration, image, userEmail, details]
    );

    console.log('Created listing:', result.rows[0]); // Debug log
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error creating listing:', error);
    res.status(500).json({ error: 'Failed to create listing' });
  }
});

// Get listings for logged-in user - simplified version
app.get('/api/listings/my-listings', async (req, res) => {
  try {
    const userEmail = req.query.email;
    console.log('Looking for listings with email:', userEmail);

    const result = await pool.query(
      'SELECT * FROM listings WHERE user_email = $1 ORDER BY id DESC',
      [userEmail]
    );
    
    console.log('Query result:', result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (user && await bcrypt.compare(password, user.password)) {
      // Set user id in session
      req.session.userId = user.id;
      console.log('Login successful, session:', req.session);
      
      // Save session explicitly
      req.session.save((err) => {
        if (err) {
          console.error('Session save error:', err);
          return res.status(500).json({ error: 'Failed to create session' });
        }
        res.json({ 
          message: 'Logged in successfully',
          user: { id: user.id, email: user.email }
        });
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add this endpoint to handle logout
app.post('/api/logout', (req, res) => {
  try {
    // Clear the session
    if (req.session) {
      req.session.destroy();
    }
    res.clearCookie('connect.sid'); // Clear the session cookie
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Failed to logout' });
  }
});

// Add this delete endpoint
app.delete('/api/listings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { userEmail } = req.query;

    console.log(`Attempting to delete listing ${id} for user ${userEmail}`); // Debug log

    // First check if the listing belongs to the user
    const checkResult = await pool.query(
      'SELECT * FROM listings WHERE id = $1 AND user_email = $2',
      [id, userEmail]
    );

    if (checkResult.rows.length === 0) {
      console.log('Unauthorized deletion attempt'); // Debug log
      return res.status(403).json({ error: 'Not authorized to delete this listing' });
    }

    // If authorized, delete the listing
    await pool.query('DELETE FROM listings WHERE id = $1', [id]);
    console.log(`Successfully deleted listing ${id}`); // Debug log
    
    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.error('Error deleting listing:', error);
    res.status(500).json({ error: 'Failed to delete listing' });
  }
});

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// API Routes (moved before other routes to prevent conflicts)
// All API routes are already defined above

// Static files (moved after API routes to prevent conflicts)
app.use(express.static(path.join(__dirname, 'public')));

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

// Test endpoint to verify server is running
app.get('/test', (req, res) => {
    res.json({ message: 'Server is running!' });
});

// Start server with logging
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
