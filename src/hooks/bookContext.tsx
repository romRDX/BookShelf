import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';
import { Book } from '../store/ducks/books/types';

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
  selectedBook: Book;
  selectBook(book: Book): void;
  updateBook(data: Book): void;
  deleteBook(id: string): void;


  // signIn(credentials: SignInCredentials): Promise<void>;
  // signOut(): void;
  // updateUser(data: User): void;
}

const AuthContext = createContext<BookContextData>({} as BookContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [selectedBook, setSelectedBook] = useState<Book>({} as Book);
  const [storedBooks, setStoredBooks] = useState<Book[]>([]);

  useEffect(()=>{
    const bookStore = localStorage.getItem('Sheetgo/Books');

    if(bookStore){
      setStoredBooks(JSON.parse(bookStore));
    } else {
      throw new Error('Books not found');
    }
  },[]);

  const selectBook = useCallback( (book: Book) => {
    setSelectedBook(book);
  }, []);

  const updateBook = useCallback((updatedBook: Book) => {

    const updatedStoredBooks = storedBooks.map( (book: Book) => {
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
