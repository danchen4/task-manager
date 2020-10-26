require('../src/db/mongoose');
const User = require('../src/models/user');
const Task = require('../src/models/task');

const ID1 = '5f9363b385d3843cfc3b28b3';
const ID2 = '5f9375e29c593c2f484e1b67';
const TASK1 = '5f9367bc7199e2455c6f1f59';

User.findByIdAndUpdate(ID2, {
  age: 1,
})
  .then((user) => {
    console.log('user', user);
    // Need to return a promise in order to chain
    return User.countDocuments({ age: 1 });
  })
  .then((count) => console.log('users age 1: ', count))
  .catch((err) => console.log(err));

Task.findByIdAndDelete(TASK1)
  .then((task) => {
    console.log('deleted task', task);
    return Task.countDocuments({ completed: false });
  })
  .then((count) => console.log('completed tasks: ', count))
  .catch((err) => console.log(err));
