import { IUser } from "./user.memory.repository";

export {};
const { v4: uuidv4 } = require('uuid');
const users = require('./user.memory.repository');
const tasks = require('../tasks/task.memory.repository');

/**
 * returns  Array of users
 * @returns  array of users
 */


const getAll = () => users;

/**
 * return  User by id
 * @param id - user id
 * @returns user by id
 */

const getUserById = (id: string) => {
  const user = users.find((u: IUser) => u.id === id);
  return user;
};

/**
 * Creates new user
 * @param user - user object
 * @returns new user
 */

const createUser = (user: IUser) => {
  const newUser = {
    ...user,
    id: uuidv4(),
  };
  users.push(newUser);
  if (newUser.password) {
    delete newUser.password;
  }
  return newUser;
};

/**
 * Updates user from users array
 * @param id - user id
 * @param body - request body with user object
 * @returns updated user
 */

const updateUser = (id: string, body: IUser) => {
  const userToUpdate = users.find((user: IUser) => user.id === id);
  if (!userToUpdate) {
    return false;
  }
  const updatedPerson = body;
  updatedPerson.id = id;

  const index = users.findIndex((user: IUser) => user.id === id);
  users[index] = {
    ...updatedPerson,
  };
  return updatedPerson;
};

/**
 * Deletes user from users array
 * @param id - user id
 * @returns string with deletion message or false if user was deleted unsuccessfully
 */

const deleteUser = (id: string) => {
  const userToDelete = users.find((user: IUser) => user.id === id);
  if (!userToDelete) {
    return false;
  }
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i]?.userId === id) {
      tasks[i].userId = null;
    }
  }
  users.splice(users.indexOf(userToDelete), 1);
  return `User with id ${id} was deleted successfully!`;
};

module.exports = { getAll, createUser, getUserById, updateUser, deleteUser };
