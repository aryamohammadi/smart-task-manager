const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware');

// Add a new task
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newTask = new Task({
      ...req.body,
      user: req.user, // Assuming req.user contains the user ID
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error adding task:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all tasks for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user });
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a task by ID
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      console.error('Task not found with ID:', req.params.id);
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user.toString()) {
      console.error('User not authorized to delete this task:', req.user);
      return res.status(401).json({ message: 'User not authorized' });
    }

    // Corrected method to delete a task
    await Task.deleteOne({ _id: req.params.id });

    res.json({ message: 'Task removed' });
  } catch (error) {
    console.error('Error deleting task:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a task by ID
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      console.error('Task not found with ID:', req.params.id);
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user.toString()) {
      console.error('User not authorized to update this task:', req.user);
      return res.status(401).json({ message: 'User not authorized' });
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
