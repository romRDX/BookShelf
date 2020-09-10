/**
 * Action Types
 */
export enum BooksTypes {
  CREATE_BOOK = '@books/CREATE_BOOK',
  EDIT_BOOK = '@books/EDIT_BOOK',
  DELETE_BOOK = '@books/DELETE_BOOK',
}

/**
 * Data Types
 */
export interface IBook {
  id: string;
  img: string;
  created_at: Date;
  title: string;
  description: string;
  author: string;
  category: string;
  deleted: boolean;
}


/**
 * State type
 */
export interface BooksState {
  readonly data: IBook[];
}
