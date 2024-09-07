const mongoose = require('mongoose');

// User Schema Definition
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'], // Schema-level validation with error message
    unique: true, // Ensure usernames are unique
    minlength: [3, 'Username must be at least 3 characters long'], // Minimum length validation
    maxlength: [30, 'Username cannot exceed 30 characters'], // Maximum length validation
    trim: true // Automatically trim spaces from username
  },
  password: {
    type: String,
    required: [true, 'Password is required'], // Schema-level validation with error message
    minlength: [6, 'Password must be at least 6 characters long'], // Minimum length validation
  }
});

// Error Handling for Unique Username
UserSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    console.error('Username already exists:', doc.username); // Log the conflicting username
    next(new Error('This username is already taken. Please choose another one.'));
  } else {
    next(error); // Pass other errors to the next middleware
  }
});

// Add a pre-save hook to check password length and hash it (just as an example)
UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next(); // Only hash the password if it's new or modified

    if (this.password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); // Hash the password before saving
    next();
  } catch (error) {
    console.error('Error during password hashing:', error.message);
    next(error); // Pass the error to the next middleware
  }
});

module.exports = mongoose.model('User', UserSchema);
