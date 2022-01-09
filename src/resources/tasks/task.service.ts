import { ITask } from "./task.memory.repository";

export {};
const { v4: uuidv4 } = require('uuid');
const tasks = require('./task.memory.repository');

/**
 * returns  Array of tasks
 * @returns  array of tasks
 */

const getAllTasks = () => tasks;

/**
 * return  Task by id
 * @param _boardId - board id
 * @param taskId - task id
 * @returns task by id
 */

const getTaskById = (_boardId: string, taskId: string) => {
  const task = tasks.find((t: ITask) => t.id === taskId);
  return task;
};

/**
 * Creates new task
 * @param task - task object fron request
 * @param brdId - object with board id
 * @returns new task
 */

const createTask = (task: ITask, brdId: { boardId: string }) => {
  const newTask = {
    ...task,
    id: uuidv4(),
  };
  newTask.boardId = brdId.boardId;
  tasks.push(newTask);
  return newTask;
};

/**
 * Updates task from tasks array
 * @param _boardId - board id
 * @param taskId - task id 
 * @param body - request body with task object
 * @returns updated task
 */

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

/**
 * Deletes task from tasks array
 * @param _boardId - board id
 * @param taskId - task id
 * @returns string with deletion message or false if task was deleted unsuccessfully
 */

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
