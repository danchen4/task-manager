/**
 * To fire up mongoDB database, open Powershell (Ctrl + Shift + P)
 * and run: /Users/dchen/mongodb/bin/mongod.exe --dbpath=/Users/dchen/mongodb-data
 */

const mongoose = require('mongoose');

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api';

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
});
