/**
 * Local Storage Bookss Service.
 * Manipulate the Books object in local storage.
 */
import bookImage from '../assets/book.jpg';
import { v4 as uuid } from 'uuid';
import { IBook } from '../store/ducks/books/types';

// Create a book within local storage
export const post = (newBook: IBook) => {
  const storedBooks = get();

  const formattedBook = {
    ...newBook,
    id: uuid(),
    img: bookImage,
    created_at: Date.now(),
    category: 'uncategorized',
    deleted: false,
  }

  // checks if there is already an store, so it can add the new book or just return it alone
  if(storedBooks){
    const newStoredBooks = [...storedBooks, formattedBook];
    localStorage.setItem('Sheetgo/Books', JSON.stringify(newStoredBooks));
  } else {
    const newBooksStore = [ formattedBook ];
    localStorage.setItem('Sheetgo/Books', JSON.stringify(newBooksStore));
  }

  return formattedBook;
}

// Get all books from local storage
export const get = () => {
  const bookStore = localStorage.getItem('Sheetgo/Books');

  if(bookStore){
    return JSON.parse(bookStore);
  }
};

// Update all books from local storage
export const put = (books: IBook[]) => {
  localStorage.removeItem('Sheetgo/Books')
  localStorage.setItem('Sheetgo/Books', JSON.stringify(books));
};

// Update a single book from local storage
export const patch = (updatedBook: IBook) => {
  // Searchs for the given book to update it
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
