import { ITask } from "./task.memory.repository";

export {};
const { v4: uuidv4 } = require('uuid');
const tasks = require('./task.memory.repository');

const getAllTasks = () => tasks;

const getTaskById = (_boardId: string, taskId: string) => {
  const task = tasks.find((t: ITask) => t.id === taskId);
  return task;
};

const createTask = (task: ITask, brdId: { boardId: string }) => {
  const newTask = {
    ...task,
    id: uuidv4(),
  };
  newTask.boardId = brdId.boardId;
  tasks.push(newTask);
  return newTask;
};

const updateTask = (_boardId: string, taskId: string, body: ITask) => {
  const taskToUpdate = tasks.find((task: ITask) => task.id === taskId);
  if (!taskToUpdate) {
    return false;
  }
  const updatedTask = body;
  updatedTask.id = taskId;

  const index = tasks.findIndex((task: ITask) => task.id === taskId);
  tasks[index] = {
    ...updatedTask,
  };
  return updatedTask;
};

const deleteTask = (_boardId: string, taskId: string) => {
  const taskToDelete = tasks.find((task: ITask) => task.id === taskId);
  if (!taskToDelete) {
    return false;
  }
  tasks.splice(tasks.indexOf(taskToDelete), 1);
  return `Task with id ${taskId} was deleted successfully!`;
};

module.exports = {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
};
