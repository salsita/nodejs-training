const { usersModel } = require("../../src/db");

const createUser = () => {
  const firstName = Math.random();
  const lastName = Math.random();
  const email = Math.random();
  return usersModel.insert({ firstName, lastName, email });
};

const removeUser = (user) => usersModel.removeById(user.userId);

module.exports = { createUser, removeUser };
