/**
 * To fire up mongoDB database, open Powershell (Ctrl + Shift + P)
 * and run: /Users/dchen/mongodb/bin/mongod.exe --dbpath=/Users/dchen/mongodb-data
 */

const mongoose = require('mongoose');

const connectionURL = process.env.MONGODB_URL;

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
});
