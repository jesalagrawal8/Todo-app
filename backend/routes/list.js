const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const List = require('../models/list');

// Create task
router.post('/addTask', async (req, res) => {
  try {
    const { title, body, id } = req.body;
    const existingUser = await User.findById(id);
    if (existingUser) {
      const list = new List({ title, body, user: existingUser });
      await list.save();
      existingUser.list.push(list);
      await existingUser.save();
      return res.status(200).json({ list });
    }
    return res.status(404).json({ message: 'User not found' });
  } catch (error) {
    console.error('Error adding task:', error);
    return res.status(500).json({ message: 'Failed to add task' });
  }
});

// Update task
router.put('/updateTask/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const { title, body } = req.body;
    const list = await List.findByIdAndUpdate(
      req.params.id,
      { title, body },
      { new: true, runValidators: true }
    );

    if (!list) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({ message: 'Task Updated', list });
  } catch (error) {
    console.error('Update error details:', error);
    return res.status(500).json({ message: 'Failed to update task', error: error.message });
  }
});

// Delete task
router.delete('/deleteTask/:id', async (req, res) => {
  try {
    const { id } = req.body;
    const existingUser = await User.findByIdAndUpdate(id, {
      $pull: { list: req.params.id },
    });
    if (existingUser) {
      await List.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: 'Task Deleted' });
    }
    return res.status(404).json({ message: 'User not found' });
  } catch (error) {
    console.error('Error deleting task:', error);
    return res.status(500).json({ message: 'Failed to delete task' });
  }
});

// Get tasks
router.get('/getTasks/:id', async (req, res) => {
  try {
    const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });
    if (list.length > 0) {
      return res.status(200).json({ list });
    }
    return res.status(200).json({ message: 'No Tasks' });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return res.status(500).json({ message: 'Failed to fetch tasks' });
  }
});

module.exports = router;
