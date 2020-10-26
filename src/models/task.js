const mongoose = require('mongoose');
const validator = require('validator');

const taskSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', //reference to User model
  },
});

const Task = mongoose.model('Tasks', taskSchema);

module.exports = Task;
