const mongoose = require('mongoose');

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api';

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

// const User = mongoose.model('User', {
//   name: { type: String },
//   age: { type: Number },
// });

// const user1 = new User({ name: 'Dan', age: 'five' });

// user1
//   .save()
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));


const Task = mongoose.model('Tasks', {
  description: {
    type: String
  },
  completed: {
    type: Boolean
  }
})

const task1 = new Task({ description: 'Learn the Mongoose Library', completed: false })
  .save()
  .then((res) => console.log(res))