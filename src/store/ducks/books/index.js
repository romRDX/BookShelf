import { BooksTypes } from './types';

import initialState from './initialState';

import * as bookStore from '../../../services/bookStore.ts';

const storedBooks = bookStore.get();

const INITIAL_STATE = {
  data: storedBooks ? storedBooks : initialState,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BooksTypes.CREATE_BOOK:
      return {
        ...state,
        data: [...state.data, action.newBook],
      };

    case BooksTypes.EDIT_BOOK: {
      const newData = state.data.map( (book) => {
        if ( book.id === action.newBook.id) {
          return action.newBook;
        } else {
          return book;
        }
      });

      return {
        ...state,
        data: newData
      }
    }

    case BooksTypes.DELETE_BOOK: {
      const newData = state.data.map( (book) => {
        if ( book.id === action.bookId) {
          return {
            ...book,
            deleted: true
          };
        } else {
          return book;
        }
      });

      return {
        ...state,
        data: newData
      }
    }



    default:
      return state;
  }
};

export default reducer;
