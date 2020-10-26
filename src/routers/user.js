const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');

// router
const router = new express.Router();

/////////////////// User ROUTES //////////////////////

// sign up
router.post('/users', async (req, res) => {
  // Instatiate user model from User constructor (built off User Schema)
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }

  // user
  //   .save()
  //   .then(() => {
  //     res.status(201).send(user);
  //   })
  //   .catch((err) => {
  //     res.status(400).send(err);
  //   });
});

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send();
  }
});

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send();
  }
});

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (err) {
    res.status(500).send();
  }
});

router.get('/users/me', auth, async (req, res) => {
  res.send(req.user);
});

// Users should not be able to access any user
//#region
// router.get('/users/:id', async (req, res) => {
//   //fetch all users stored in MongoDB
//   const _id = req.params.id;

//   try {
//     const user = await User.findById(_id);
//     if (!user) {
//       return res.status(404).send();
//     }
//     res.send(user);
//   } catch (err) {
//     res.status(500).send();
//   }
// });
//#endregion

router.patch('/users/me', auth, async (req, res) => {
  // const _id = req.user._id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValid = updates.every((update) => allowedUpdates.includes(update));

  if (!isValid) {
    return res.status(400).send({ error: 'Invalid update (property does not exist)' });
  }

  try {
    // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });

    // In order to run through middleware first, must use the .save() function
    // const user = await User.findById(_id);
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    // if (!user) {
    //   return res.status(404).send;
    // }

    res.send(req.user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete('/users/me', auth, async (req, res) => {
  // const _id = req.user._id;

  try {
    // const user = await User.findByIdAndDelete(_id);
    // if (!user) {
    //   return res.status(404).send({ error: 'user does not exist' });
    // }

    await req.user.remove();
    res.send(req.user);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
