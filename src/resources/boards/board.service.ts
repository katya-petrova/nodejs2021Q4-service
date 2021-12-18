import { ITask } from '../tasks/task.memory.repository';
import { IBoard } from './board.memory.repository';

const { v4: uuidv4 } = require('uuid');

const tasks = require('../tasks/task.memory.repository');
const boards = require('./board.memory.repository');

const getAll = () => boards;

const getBoardById = (id: string) => {
  const user = boards.find((b: IBoard) => b.id === id);
  return user;
};

const createBoard = (board: IBoard) => {
  const newBoard = {
    ...board,
    id: uuidv4(),
  };
  if (newBoard.columns) {
    for (let i = 0; i < newBoard.columns.length; i += 1) {
      newBoard.columns[i]!.id = uuidv4();
    }
  }
  boards.push(newBoard);
  return newBoard;
};

const updateBoard = (id: string, body: IBoard) => {
  const boardToUpdate = boards.find((board: IBoard) => board.id === id);
  if (!boardToUpdate) {
    return false;
  }
  const updatedBoard = body;
  updatedBoard.id = id;

  const index = boards.findIndex((board: IBoard) => board.id === id);
  boards[index] = {
    ...updatedBoard,
  };
  return updatedBoard;
};

const deleteBoard = (id: string) => {
  const boardToDelete = boards.find((board: IBoard) => board.id === id);
  if (!boardToDelete) {
    return false;
  }
  const tasksToDelete: ITask[] = [];
  
  console.warn('TASKS', tasks)

  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].boardId === id) {
      tasksToDelete.push(tasks[i]);
    }
  }

  for (let i = 0; i < tasksToDelete.length; i += 1) {
    tasks.splice(tasks.indexOf(tasksToDelete[i]));
  }
  
  boards.splice(boards.indexOf(boardToDelete), 1);
  return `Board with id ${id} was deleted successfully!`;
};

module.exports = {
  getAll,
  createBoard,
  getBoardById,
  updateBoard,
  deleteBoard,
};
