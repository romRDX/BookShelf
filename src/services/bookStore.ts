/**
 * Local Storage Bookss Service.
 * Manipulate the Books object in local storage.
 */

import bookImage from '../assets/book.jpg'; //'../../assets/book.jpg';
import { v4 as uuid } from 'uuid';
import { IBook } from '../store/ducks/books/types';

export const post = (newBook: IBook) => {
  const storedBooks = get();

  console.log(newBook);

  const formattedBook = {
    ...newBook,
    id: uuid(),
    img: bookImage,
    created_at: Date.now(),
    category: 'uncategorized',
    deleted: false,
  }

  if(storedBooks){
    const newStoredBooks = [...storedBooks, formattedBook];
    localStorage.setItem('Sheetgo/Books', JSON.stringify(newStoredBooks));
  } else {
    const newBooksStore = [ formattedBook ];
    localStorage.setItem('Sheetgo/Books', JSON.stringify(newBooksStore));
  }

  console.log('x: ',formattedBook);
  return formattedBook;
}

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
  const storedBooks = get();
  const updatedStoredBooks = storedBooks.map( (book: IBook) => {
    if(book.id === updatedBook.id){
      return {...updatedBook};
    } else {
      return book;
    }
  })

  localStorage.setItem('Sheetgo/Books', JSON.stringify(updatedStoredBooks));
};
