import { ITask } from '../tasks/task.service';

const { v4: uuidv4 } = require('uuid');

interface IColumn {
  id: string;
  title: string;
  order: string | number;
}

interface IBoard {
  id: string;
  title: string;
  columns: IColumn[];
}

// export interface ITask {
//   id: string;
//   title: string;
//   order: number;
//   description: string;
//   userId: string | null;
//   boardId: string;
//   columnId: string | null;
//   params: object;
// }

const boards: IBoard[] = [];

const tasks = require('../tasks/task.service');

const getAll = () => boards;

const getBoardById = (id: string) => {
  const user = boards.find((b) => b.id === id);
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
  const boardToUpdate = boards.find((board) => board.id === id);
  if (!boardToUpdate) {
    return false;
  }
  const updatedBoard = body;
  updatedBoard.id = id;

  const index = boards.findIndex((board) => board.id === id);
  boards[index] = {
    ...updatedBoard,
  };
  return updatedBoard;
};

const deleteBoard = (id: string) => {
  const boardToDelete = boards.find((board) => board.id === id);
  if (!boardToDelete) {
    return false;
  }
  const tasksToDelete: ITask[] = [];

  for (let i = 0; i < tasks.length; i++) {
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
