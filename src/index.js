const express = require('express');
require('./db/mongoose'); //ensures that the file runs, and mongoose connects to the database
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();

// Get PORT from Heroku from env object, or 3000 if local
const port = process.env.PORT || 3000;

// get express to automatically parse incoming JSON into an object, so that they can used by req.body
app.use(express.json());

// user router
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});

// const Task = require('./models/task');
// const User = require('./models/user');

// const main = async () => {
//   // const task = await Task.findById('5f971fae25913c453ce61d41');
//   // await task.populate('owner').execPopulate();
//   // console.log(task.owner);

//   const user = await User.findById('5f972375767a73062c6aeaf8');
//   await user.populate('tasks').execPopulate();
//   console.log(user.tasks);
// };

// main();
