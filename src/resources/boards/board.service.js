/* eslint-disable consistent-return */
const { v4: uuidv4 } = require('uuid');
const boards = require('./board.memory.repository');
const tasks = require('../tasks/task.memory.repository');

const getAll = () => boards;

const getBoardById = (id) => {
  const user = boards.find((b) => b.id === id);
  return user;
};

const createBoard = (board) => {
  const newBoard = {
    id: uuidv4(),
    ...board,
  };
  if (newBoard.columns) {
    for (let i = 0; i < newBoard.columns.length; i += 1) {
      newBoard.columns[i].id = uuidv4();
    }
  }
  boards.push(newBoard);
  return newBoard;
};

const updateBoard = (id, body) => {
  const boardToUpdate = boards.find((board) => board.id === id);
  if (!boardToUpdate) {
    return;
  }
  const updatedBoard = body;
  updatedBoard.id = id;

  const index = boards.findIndex((board) => board.id === id);
  boards[index] = {
    ...updatedBoard,
  };
  return updatedBoard;
};

const deleteBoard = (id) => {
  const boardToDelete = boards.find((board) => board.id === id);
  if (!boardToDelete) {
    return;
  }
  const tasksToDelete = [];
  tasks.map((task) => {
    if (task.boardId === id) {
      tasksToDelete.push(task);
    }
    return true;
  });
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
