/**
 * Local Books Storage Service
 */
import { Book } from '../store/ducks/books/types';

export const get = (): Book[] => {
  const bookStore = localStorage.getItem('Sheetgo/Books');

  if(bookStore){
    return JSON.parse(bookStore);
  } else {
    throw new Error('No storage found');
  }
};

export const put = (books: Book[]) => {
  localStorage.removeItem('Sheetgo/Books')
  localStorage.setItem('Sheetgo/Books', JSON.stringify(books));
};

export const patch = (updatedBook: Book) => {
  // localStorage.removeItem('Sheetgo/Books');

  const storedBooks = get();

  const updatedStoredBooks = storedBooks.map( book => {
    if(book.id === updatedBook.id){
      return updatedBook;
    }
  })

  localStorage.setItem('Sheetgo/Books', JSON.stringify(updatedStoredBooks));
};
