const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

// Create a schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is not valid');
        }
      },
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error('Age must be a positive number');
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error('Password cannot contain the word "password"');
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

//////////////////////////// Virtual Property ///////////////////////////
userSchema.virtual('tasks', {
  ref: 'Tasks',
  localField: '_id',
  foreignField: 'owner',
});

//////////////////////// Schema Methods (on documents) /////////////////////////

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  user.save();

  return token;
};

userSchema.methods.toJSON = function () {
  const user = this;

  // convert user document to an object
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

//////////////////////// Schema Statics (on models) /////////////////////////

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

//////////////////////// Middleware /////////////////////////
// for hashing plain text password before saving
userSchema.pre('save', async function (next) {
  const user = this; // this is the document (or row in MongoDB) being saved

  // If the password has been modified, then hash the password
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next(); //Call next when done to save the user
});

// Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });
  next();
});

// Create a model from the schema
// models (are JS classes) that can instatiate documents (or rows in MongoDB)
const User = mongoose.model('User', userSchema);

module.exports = User;
