import React, { createContext, useCallback, useState, useContext } from 'react';
import { IBook } from '../store/ducks/books/types';
import booksInitialState from '../store/ducks/books/initialState';

import * as bookStore from '../services/bookStore';

interface BookContextData {
  selectedBook: IBook;
  contextBooks: IBook[];
  setSelectedBook(book: IBook): void;
  createBook(newBook: IBook): void;
  updateBook(data: IBook): void;
  deleteBook(id: string): void;
}

const BookContext = createContext<BookContextData>({} as BookContextData);

export const BookProvider: React.FC = ({ children }) => {
  const [selectedBook, setSelectedBook] = useState<IBook>({} as IBook);
  const [availableBooks, setAvailableBooks] = useState<any>( () => {
    const storedBooks = localStorage.getItem('Sheetgo/Books');

    if(storedBooks){
      return JSON.parse(storedBooks);
    } else {
      localStorage.setItem('Sheetgo/Books', JSON.stringify(booksInitialState))
      return booksInitialState;
    }
  });

  const createBook = useCallback( (newBook: IBook) => {
    // Update local storage state with the new created book
    const createdBook = bookStore.post(newBook);

    // update local context state with the new created book
    setAvailableBooks([...availableBooks, createdBook]);
  }, [availableBooks]);

  const updateBook = useCallback((updatedBook: IBook) => {
    const updatedStoredBooks = availableBooks.map( (book: IBook) => {
      if(book.id === updatedBook.id){
        return updatedBook;
      } else {
        return book;
      }
    })

    localStorage.setItem('Sheetgo/Books', JSON.stringify(updatedStoredBooks));
    setAvailableBooks(updatedStoredBooks);
    setSelectedBook(updatedBook);
  }, [availableBooks]);

  const deleteBook = useCallback( (id: string) => {
    const updatedComments = availableBooks.map( (book: IBook) => {
      if(book.id === id){
        return {
          ...book,
          deleted: true
        }
      } else {
        return book;
      }
    })

    setAvailableBooks(updatedComments);
    bookStore.deleteBook(id);
  }, []);

  return (
    <BookContext.Provider
      value={{
          selectedBook,
          contextBooks: availableBooks,
          setSelectedBook,
          updateBook,
          deleteBook,
          createBook }}
      >
      {children}
    </BookContext.Provider>
  );
};

export function useBooks(): BookContextData {
  const context = useContext(BookContext);

  if (!context) {
    throw new Error('useBooks must be used within an bookProvider');
  }

  return context;
}
