import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createBook } from '../../store/ducks/books/actions';
import * as bookStore from '../../services/bookStore';

import orderBy from '../../utils/orderBy';
import filterBy from '../../utils/filterBy';

import {
  Container,
  Content,
  SectionTitle,
} from './styles';

import ModalAddBook from '../../components/ModalAddBook';

import GoBackButton from '../../components/GoBackButton';

import Header from '../../components/Header';

import BooksContainer from '../../components/BooksContainer';

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
  const [orderType, setOrderType] = useState('A-Z');
  const [orderDirection, setOrderDirection] = useState('ASC');
  const [nameFilter, setNameFilter] = useState('');

  useEffect(()=> {
      setAvailableBooks(books);
  }, [books]);

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
    const filteredBooks = filterBy(availableBooks, 'wantToRead', nameFilter);

    if( orderType || orderDirection ){
      console.log('un: ',filteredBooks);
      return orderBy(filteredBooks, orderType, orderDirection);
    } else {
      console.log('2');
      return filteredBooks;
    }
  }, [availableBooks, orderType, orderDirection, nameFilter]);

  const setOrder = useCallback((orderOption: string): void => {

  },[]);

  return (
    <Container>
      <Header
        toggleModal={toggleModal}
        orderBy
        setOrderType={setOrderType}
        setOrderDirection={setOrderDirection}
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
      />

      <ModalAddBook
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddBook={handleAddBook}
      />

      <Content>
        <BooksContainer booksProps={wantToReadBooks}>
          <SectionTitle>Want to read Books</SectionTitle>
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
