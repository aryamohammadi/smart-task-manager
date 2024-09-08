if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); // Load environment variables only in development
}
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Import the auth routes
const taskRoutes = require('./routes/task'); // Import task routes

const app = express();
app.use(cors());
app.use(express.json());

// Route setup for auth
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes); // Use task routes

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Task Manager API!');
});

// Error handling for undefined routes
app.use((req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error('Error occurred:', err.message); // Log the error message

  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500,
    },
  });
});

// MongoDB connection
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in the environment variables.');
  process.exit(1); // Exit the process if MongoDB URI is not found
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    // Provide guidance for common errors
    if (err.message.includes('IP')) {
      console.error('Ensure your IP is whitelisted in MongoDB Atlas.');
    }
    process.exit(1); // Exit the process if there is a MongoDB connection error
  });

// Start the server
app.listen(PORT, (err) => {
  if (err) {
    console.error('Server startup error:', err.message);
    process.exit(1); // Exit the process if the server fails to start
  }
  console.log(`Server is running on http://localhost:${PORT}`);
});
