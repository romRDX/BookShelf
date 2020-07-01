import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';
import { IBook } from '../store/ducks/books/types';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthStateData {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface BookContextData {
  selectedBook: IBook;
  selectBook(book: IBook): void;
  updateBook(data: IBook): void;
  deleteBook(id: string): void;


  // signIn(credentials: SignInCredentials): Promise<void>;
  // signOut(): void;
  // updateUser(data: User): void;
}

const AuthContext = createContext<BookContextData>({} as BookContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [selectedBook, setSelectedBook] = useState<IBook>({} as IBook);
  const [storedBooks, setStoredBooks] = useState<IBook[]>([]);

  useEffect(()=>{
    const bookStore = localStorage.getItem('Sheetgo/Books');

    if(bookStore){
      setStoredBooks(JSON.parse(bookStore));
    } else {
      throw new Error('Books not found');
    }
  },[]);

  const selectBook = useCallback( (book: IBook) => {
    setSelectedBook(book);
  }, []);

  const updateBook = useCallback((updatedBook: IBook) => {

    const updatedStoredBooks = storedBooks.map( (book: IBook) => {
      if(book.id === updatedBook.id){
        return updatedBook;
      }
    })

    localStorage.setItem('Sheetgo/Books', JSON.stringify(updatedStoredBooks));

  }, []);

  const deleteBook = useCallback( (id: string) => {

  }, []);

  return (
    <AuthContext.Provider
      value={{ selectedBook, selectBook, updateBook, deleteBook }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): BookContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an authProvider');
  }

  return context;
}
