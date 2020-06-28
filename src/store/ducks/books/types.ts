/**
 * Action Types
 */
export enum BooksTypes {
  CREATE_BOOK = '@books/CREATE_BOOK',
  EDIT_BOOK = '@books/EDIT_BOOK',
}

/**
 * Data Types
 */
export interface Book {
  id: string;
  img: string;
  timestamp: number;
  title: string;
  description: string;
  author: string;
  category: string;
  deleted: boolean;
}
