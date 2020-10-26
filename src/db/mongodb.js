// CRUD operations

// const mongodb = require('mongodb');
// Initaliaze mongodb
// const MongoClient = mongodb.MongoClient;

// typing out IP for localhost (127.0.0.1) removes odd bugs;
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const { MongoClient, ObjectID, ObjectId } = require('mongodb');

// const id = new ObjectID();
// console.log(id.id.length);
// console.log(id.toHexString().length);
// console.log(id.getTimestamp());

// connect to mongodb server
MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) return console.log('Unable to connect to database!');

    console.log('Connected!');

    // Get a reference to database we want to manipulate
    const db = client.db(databaseName);

    // Inserting (Create)
    //#region
    // db.collection('users').insertOne(
    //   {
    //     name: 'Vikram',
    //     age: 32,
    //   },
    //   (error, result) => {
    //     if (error) return console.log('Unable to insert user');

    //     console.log(result.ops);
    //   }
    // );

    // db.collection('tasks').insertMany(
    //   [
    //     {
    //       description: 'Pick up groceries',
    //       completed: true,
    //     },
    //     {
    //       description: 'Clean house',
    //       completed: false,
    //     },
    //     {
    //       description: 'Take out garbage',
    //       completed: false,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log('Unable to insert documents');
    //     }

    //     console.log(result.ops);
    //   }
    // );
    //#endregion

    // Query (Read)
    //#region
    // db.collection('users').findOne(
    //   { _id: new ObjectID('5f5cf0ac6fb3ad3110aa889e') },
    //   (error, user) => {
    //     if (error) return console.log('Unable to fetch');

    //     !user ? console.log('Could not find') : console.log(user);
    //   }
    // );

    // db.collection('users')
    //   .find({ age: 34 })
    //   .toArray((error, user) => {
    //     if (error) return console.log('Unable to fetch');

    //     !user ? console.log('Could not find') : console.log(user);
    //   });

    // db.collection('users')
    //   .find({ age: 34 })
    //   .count((error, count) => {
    //     if (error) return console.log('Unable to fetch');

    //     console.log(count);
    //   });

    // db.collection('tasks').findOne(
    //   { _id: new ObjectId('5f3b3662853b152dac51ca3f') },
    //   (error, result) => {
    //     if (error) return console.log('Unable to connect');

    //     console.log(result);
    //   }
    // );

    // db.collection('tasks')
    //   .find({ completed: false })
    //   .toArray((error, tasks) => {
    //     console.log(tasks);
    //   });

    //#endregion

    // Update (Update)
    //#region
    // db.collection('users')
    //   .updateOne(
    //     { _id: new ObjectId('5f5ed03a250ec12d504c579b') },
    //     {
    //       // $set: {
    //       //   name: 'John',
    //       // },
    //       $inc: {
    //         age: 5,
    //       },
    //     }
    //   )
    //   .then((result) => console.log(result.modifiedCount))
    //   .catch((err) => console.log(err));

    // db.collection('tasks')
    //   .updateMany(
    //     { completed: false },
    //     {
    //       $set: {
    //         completed: true,
    //       },
    //     }
    //   )
    //   .then((result) => console.log(result.modifiedCount))
    //   .catch((err) => console.log(err));
    //#endregion

    // Delete (Delete)
    //#region
    // db.collection('users')
    //   .deleteMany({ age: 32 })
    //   .then((res) => console.log(res.deletedCount))
    //   .catch((err) => console.log(err));

    // db.collection('tasks')
    //   .deleteMany({ description: 'Pick up groceries' })
    //   .then((res) => console.log(res.deletedCount))
    //   .catch((err) => console.log(err));

    //#endregion
  }
);
