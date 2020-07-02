import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createBook } from '../../store/ducks/books/actions';
import * as bookStore from '../../services/bookStore';
import * as categoryStore from '../../services/categoryStore';

import { orderByDate } from '../../utils/ordenator';

import {
  Container,
  Content,
  SectionTitle,
} from './styles';

import ModalAddBook from '../../components/ModalAddBook';

import GoBackButton from '../../components/GoBackButton';

import Header from '../../components/Header';

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
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(()=> {
      setAvailableBooks(books);
  }, [availableBooks]);

  useEffect(()=>{
    bookStore.put(availableBooks);
  },[availableBooks]);

  const toggleModal = useCallback( (): void => {
    setModalOpen(!modalOpen);
  },[setModalOpen, modalOpen]);

  const handleAddBook = useCallback( (newBook: IBook): void => {
    dispatch(createBook(newBook));
    setAvailableBooks(previousState => [...previousState, newBook]);
  }, [dispatch, setAvailableBooks]);

  const wantToReadBooks = useMemo(() => {
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
        <BooksContainer booksProps={wantToReadBooks}>
          <SectionTitle>Read Books</SectionTitle>
        </BooksContainer>
        <GoBackButton />
      </Content>
    </Container>
  );
};

const mapStateToProps = (state: Statex) => ({
  books: state.books.data,
});

export default connect(mapStateToProps)(Dashboard);
