const { v4: uuidv4 } = require('uuid');
const users = require('./user.memory.repository');
const tasks = require('../tasks/task.memory.repository');

const getAll = () => users;

const getUserById = (id) => {
  const user = users.find((u) => u.id === id);
  return user;
};

const createUser = (user) => {
  const newUser = {
    id: uuidv4(),
    ...user,
  };
  users.push(newUser);
  if (newUser.password) {
    delete newUser.password;
  }
  return newUser;
};

const updateUser = (id, body) => {
  const userToUpdate = users.find((user) => user.id === id);
  if (!userToUpdate) {
    return false;
  }
  const updatedPerson = body;
  updatedPerson.id = id;

  const index = users.findIndex((user) => user.id === id);
  users[index] = {
    ...updatedPerson,
  };
  return updatedPerson;
};

const deleteUser = (id) => {
  const userToDelete = users.find((user) => user.id === id);
  if (!userToDelete) {
    return false;
  }
  for (let i = 0; i < tasks.length; i += 1) {
    if(tasks[i].userId === id) {
      tasks[i].userId = null
    }
  }
  users.splice(users.indexOf(userToDelete), 1);
  return `User with id ${id} was deleted successfully!`;
};

module.exports = { getAll, createUser, getUserById, updateUser, deleteUser };
