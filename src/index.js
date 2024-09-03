require('dotenv').config(); // Add this line to load environment variables from .env

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Import the auth routes

const app = express();
app.use(cors());
app.use(express.json());

// Route setup
app.use('/api/auth', authRoutes); // Ensure this path matches your frontend and Postman URL

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
