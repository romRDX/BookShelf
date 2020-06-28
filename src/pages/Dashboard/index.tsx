import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createBook } from '../../store/ducks/books/actions';

import 'react-day-picker/lib/style.css';
import {
  Container,
  Content,
  SectionTitle,
} from './styles';

import ModalAddBook from '../../components/ModalAddBook';

import Header from './components/Header';
import BooksContainer from './components/BooksContainer';

import { Book } from '../../store/ducks/books/types';

interface StateProps {
  books: Book[];
}

interface DispatchProps {
  dispatch: Dispatch;
}

interface Statex {
  books: {
    data: Book[]
  }
}

type Props = StateProps & DispatchProps

const Dashboard: React.FC<Props> = ({books, dispatch}) => {
  const [availableBooks, setAvailableBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book>({} as Book);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(()=> {
    const storedBooks = localStorage.getItem('Sheetgo/Books');

    if(storedBooks) {
      setAvailableBooks(JSON.parse(storedBooks));
    } else {
      setAvailableBooks(books);
      localStorage.setItem('Sheetgo/Books', JSON.stringify(books));
    }
  }, []);

  useEffect(()=>{
    localStorage.removeItem('Sheetgo/Books')
    localStorage.setItem('Sheetgo/Books', JSON.stringify(availableBooks));
  },[availableBooks]);

  const toggleModal = useCallback( (): void => {
    setModalOpen(!modalOpen);
  },[setModalOpen, modalOpen]);

  const toggleEditModal = useCallback( (): void => {
    setEditModalOpen(!editModalOpen);
  },[setEditModalOpen, editModalOpen]);

  const handleEditFood = useCallback((book: Book): void => {
    setEditingBook(book);
    toggleEditModal();
  }, [setEditingBook, toggleEditModal]);

  const handleAddBook = useCallback( (newBook: Book): void => {
    console.log('1');
    dispatch(createBook(newBook));
    console.log('2');
    setAvailableBooks(previousState => [...previousState, newBook]);
    console.log('3');
  }, [dispatch, setAvailableBooks]);

  const wantToReadBooks = useMemo(() => {
    return availableBooks.filter((book) => book.category === 'wantToRead');
  }, [availableBooks]);

  const readingBooks = useMemo(() => {
    return availableBooks.filter((book) => book.category === 'reading');
  }, [availableBooks]);

  const readBooks = useMemo(() => {
    return availableBooks.filter((book) => book.category === 'read');
  }, [availableBooks]);

  return (
    <Container>
      <Header toggleModal={toggleModal} />

      <ModalAddBook
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddBook={handleAddBook}
      />

      <Content>
        <BooksContainer booksProps={availableBooks}>
          <SectionTitle>Uncategorized</SectionTitle>
        </BooksContainer>
        <BooksContainer booksProps={wantToReadBooks}>
          <SectionTitle>Want to read</SectionTitle>
        </BooksContainer>
        <BooksContainer booksProps={readingBooks}>
          <SectionTitle>Reading books</SectionTitle>
        </BooksContainer>
        <BooksContainer booksProps={readBooks}>
          <SectionTitle>Read</SectionTitle>
        </BooksContainer>
      </Content>
    </Container>
  );
};

const mapStateToProps = (state: Statex) => ({
  books: state.books.data,
});

export default connect(mapStateToProps)(Dashboard);
