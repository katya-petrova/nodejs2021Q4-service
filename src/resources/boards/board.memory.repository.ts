interface IColumn {
    id: string;
    title: string;
    order: string | number;
  }
  
  export interface IBoard {
    id: string;
    title: string;
    columns: IColumn[];
  }
  
  export const boards: IBoard[] = [];

module.exports = boards;