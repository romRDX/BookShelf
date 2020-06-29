import React from 'react';
import { Container, BooksList, Book } from './styles';

interface Book {
  id: string;
  img: string;
  timestamp: number;
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
  return (
    <Container>
      {children}
      <BooksList>
        {booksProps.map((book: Book) => (
          <Book onClick={() => { console.log('a')}} key={book.id}>
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
