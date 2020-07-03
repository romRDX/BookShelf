import {BooksTypes} from './types';

/**
 * Actions to update the global state
 */
export const createBook = (newBook) => { return {type: BooksTypes.CREATE_BOOK, newBook: newBook}};
export const editBook = (book) => { return {type: BooksTypes.EDIT_BOOK, newBook: book}};
export const deleteBook = (bookId) => { return {type: BooksTypes.DELETE_BOOK, bookId: bookId}};

