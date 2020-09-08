import React, { useCallback } from 'react';
import { Container, BooksList, Book } from './styles';
import { useHistory } from 'react-router-dom';

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

  const sendToDetails = useCallback((book: Book)=>{
    history.push('/book-details', book );
  },[history]);

  return (
    <Container>
      {children}
      <BooksList>
        { booksProps.length > 0 ?
          booksProps.map((book: Book) => (
            !book.deleted && <Book onClick={() => sendToDetails(book)} key={book.id}>
              <img src={book.img} alt={book.title} />
              <strong>{book.title}</strong>
              <strong>{book.author}</strong>
            </Book>
          )) : <p>No Books Found</p>
        }
      </BooksList>
    </Container>
  );
};

export default BooksContainer;
