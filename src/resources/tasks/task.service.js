/* eslint-disable consistent-return */
const { v4: uuidv4 } = require('uuid');
const tasks = require('./task.memory.repository');

const getAll = () => tasks;

const getTaskById = (boardId, taskId) => {
  const task = tasks.find((t) => t.id === taskId);
  return task;
};

const createTask = (task, brdId) => {
  const newTask = {
    id: uuidv4(),
    ...task,
  };
  newTask.boardId = brdId.boardId;
  tasks.push(newTask);
  return newTask;
};

const updateTask = (boardId, taskId, body) => {
  const taskToUpdate = tasks.find((task) => task.id === taskId);
  if (!taskToUpdate) {
    return;
  }
  const updatedTask = body;
  updatedTask.id = taskId;

  const index = tasks.findIndex((task) => task.id === taskId);
  tasks[index] = {
    ...updatedTask,
  };
  return updatedTask;
};

const deleteTask = (boardId, taskId) => {
    const taskToDelete = tasks.find((task) => task.id === taskId);
  if (!taskToDelete) {
    return;
  } 
  tasks.splice(tasks.indexOf(taskToDelete), 1);
  return `Task with id ${taskId} was deleted successfully!`;
};

module.exports = { getAll, createTask, getTaskById, updateTask, deleteTask };