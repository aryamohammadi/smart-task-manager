// src/models/Task.js
const mongoose = require('mongoose');

// Define the Task schema
const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Task model using the schema
const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
