import React, { useCallback } from 'react';
import { Container, BooksList, Book } from './styles';
import { useHistory } from 'react-router-dom';
import { useBooks } from '../../hooks/booksContext';
import { IBook } from '../../store/ducks/books/types';

interface Book {
  id: string;
  img: string;
  created_at: Date;
  title: string;
  description: string;
  author: string;
  category: string;
  deleted: boolean;
}

interface BooksContainerProps {
  booksProps: Array<Book>;
}

const BooksContainer: React.FC<BooksContainerProps> = ({
  booksProps,
  children,
}) => {
  const history = useHistory();

  const { setSelectedBook } = useBooks();

  const handleSelectedBook = useCallback((book: IBook) => {
    setSelectedBook(book);
    history.push('/book-details');
  },[setSelectedBook, history]);

  return (
    <Container>
      {children}
      <BooksList>
        {booksProps.map((book: Book) => (
          !book.deleted && <Book onClick={() => handleSelectedBook(book)} key={book.id}>
            <img src={book.img} alt={book.title} />
            <strong>{book.title}</strong>
            <strong>{book.author}</strong>
          </Book>
        ))}
      </BooksList>
    </Container>
  );
};

export default BooksContainer;
