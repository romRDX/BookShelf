import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createBook } from '../../store/ducks/books/actions';
import * as bookStore from '../../services/bookStore';

import {
  Container,
  Content,
  SectionTitle,
} from './styles';

import ModalAddBook from '../../components/ModalAddBook';

import Header from './components/Header';
import BooksContainer from './components/BooksContainer';

import { IBook } from '../../store/ducks/books/types';

interface StateProps {
  books: IBook[];
}

interface DispatchProps {
  dispatch: Dispatch;
}

interface Statex {
  books: {
    data: IBook[]
  }
}

type Props = StateProps & DispatchProps

const Dashboard: React.FC<Props> = ({books, dispatch}) => {
  const [availableBooks, setAvailableBooks] = useState<IBook[]>([]);
  const [editingBook, setEditingBook] = useState<IBook>({} as IBook);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(()=> {
      setAvailableBooks(books);
  }, []);

  useEffect(()=>{
    bookStore.put(availableBooks);
  },[availableBooks]);

  const toggleModal = useCallback( (): void => {
    setModalOpen(!modalOpen);
  },[setModalOpen, modalOpen]);

  const toggleEditModal = useCallback( (): void => {
    setEditModalOpen(!editModalOpen);
  },[setEditModalOpen, editModalOpen]);

  const handleEditFood = useCallback((book: IBook): void => {
    setEditingBook(book);
    toggleEditModal();
  }, [setEditingBook, toggleEditModal]);

  const handleAddBook = useCallback( (newBook: IBook): void => {
    dispatch(createBook(newBook));
    setAvailableBooks(previousState => [...previousState, newBook]);
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
