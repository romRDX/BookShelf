/**
 * Local Books Storage Service
 */
import { IBook } from '../store/ducks/books/types';

// post

export const get = () => {
  const bookStore = localStorage.getItem('Sheetgo/Books');

  if(bookStore){
    return JSON.parse(bookStore);
  }
};

export const put = (books: IBook[]) => {
  localStorage.removeItem('Sheetgo/Books')
  localStorage.setItem('Sheetgo/Books', JSON.stringify(books));
};

export const patch = (updatedBook: IBook) => {
  // localStorage.removeItem('Sheetgo/Books');

  const storedBooks = get();

  const updatedStoredBooks = storedBooks.map( (book: IBook) => {
    if(book.id === updatedBook.id){
      return updatedBook;
    }
  })

  localStorage.setItem('Sheetgo/Books', JSON.stringify(updatedStoredBooks));
};
