require('../src/db/mongoose');
const User = require('../src/models/user');
const Task = require('../src/models/task');

const ID1 = '5f9363b385d3843cfc3b28b3';
const ID2 = '5f9375e29c593c2f484e1b67';
const TASK1 = '5f9367bc7199e2455c6f1f59';

const updateAgeAndCount = async (id, age) => {
  try {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age });
    return count;
  } catch (err) {
    console.log(err);
  }
};

updateAgeAndCount('5f9375e29c593c2f484e1b61', 3)
  .then((count) => console.log(count))
  .catch((err) => console.log(err));
