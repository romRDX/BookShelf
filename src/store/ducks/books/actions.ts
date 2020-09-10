import { action } from 'typesafe-actions';
import {BooksTypes, IBook} from './types';

/**
 * Actions to update the global state
 */
// export const createBook = (newBook) => { return {type: BooksTypes.CREATE_BOOK, newBook: newBook}};
// export const editBook = (book) => { return {type: BooksTypes.EDIT_BOOK, newBook: book}};
// export const deleteBook = (bookId) => { return {type: BooksTypes.DELETE_BOOK, bookId: bookId}};

export const createBook = (newBook: IBook) => action(BooksTypes.CREATE_BOOK, { newBook });
export const editBook = (newBook: IBook) => action(BooksTypes.EDIT_BOOK, { newBook });
export const deleteBook = (bookId: string) => action(BooksTypes.DELETE_BOOK, { bookId });
