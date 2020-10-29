const express = require('express');
require('./db/mongoose'); //ensures that the file runs, and mongoose connects to the database
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();

// Get PORT from Heroku from env object, or 3000 if local
const port = process.env.PORT;

// get express to automatically parse incoming JSON into an object, so that they can used by req.body
app.use(express.json());

// user router
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
