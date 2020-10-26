const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');

// router
const router = new express.Router();

/////////////////// Task ROUTES //////////////////////

// REST API route to post a task
router.post('/tasks', auth, async (req, res) => {
  // Instatiate user model from User constructor (built off User Schema)

  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/tasks', auth, async (req, res) => {
  //fetch all users stored in MongoDB

  try {
    const tasks = await Task.find({ owner: req.user._id });
    res.send(tasks);

    // Option 2:
    // await req.user.populate('tasks').execPopulate();
    // res.send(req.user.tasks)
  } catch (err) {
    res.status(500).send();
  }
});

router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;

  try {
    // const task = await Task.findById(_id);
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (err) {
    res.status(500).send();
  }
});

router.patch('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isValid = updates.every((update) => allowedUpdates.includes(update));

  if (!isValid) {
    return res.status(400).send({ error: 'Invalid update (property does not exist)' });
  }

  try {
    // const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
    // const task = await Task.findById(_id);
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach((update) => {
      task[update] = req.body[update];
    });
    await task.save();
    res.send(task);
  } catch (err) {
    req.status(400).send(err);
  }
});

router.delete('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOneAndDelete({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send({ error: 'user does not exist' });
    }
    res.send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
