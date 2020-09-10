import { Reducer } from 'redux';

import { BooksTypes, BooksState } from './types';

import initialState from './initialState';

import * as bookStore from '../../../services/bookStore';

const storedBooks = bookStore.get();

const INITIAL_STATE = {
  data: storedBooks ? storedBooks : initialState,
};

const reducer: Reducer<BooksState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BooksTypes.CREATE_BOOK:
      return {
        ...state,
        data: [...state.data, action.payload.newBook],
      };

    case BooksTypes.EDIT_BOOK: {
      const newData = state.data.map( (book) => {
        if ( book.id === action.payload.newBook.id) {
          return action.payload.newBook;
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
        if ( book.id === action.payload.bookId) {
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
