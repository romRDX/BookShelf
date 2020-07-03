import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createBook } from '../../store/ducks/books/actions';
import * as bookStore from '../../services/bookStore';
import * as categoryStore from '../../services/categoryStore';

import orderBy from '../../utils/orderBy';
import filterBy from '../../utils/filterBy';

import {
  Container,
  Content,
  SectionTitle,
} from './styles';

import ModalAddBook from '../../components/ModalAddBook';

import Header from '../../components/Header';
import BooksContainer from '../../components/BooksContainer';

import { IBook } from '../../store/ducks/books/types';
import { Link } from 'react-router-dom';

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
  }, [availableBooks, books]);

  useEffect(()=> {
    console.log(nameFilter);
  }, [nameFilter]);

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

  const uncategorizedBooks = useMemo(() => {
    const filteredBooks = filterBy(availableBooks, 'uncategorized', nameFilter);

    if( orderType || orderDirection ){
      console.log('un: ',filteredBooks);
      return orderBy(filteredBooks, orderType, orderDirection);
    } else {
      console.log('2');
      return filteredBooks;
    }
  }, [availableBooks, orderType, orderDirection, nameFilter]);

  const wantToReadBooks = useMemo(() => {
    const filteredBooks = filterBy(availableBooks, 'wantToRead', nameFilter);

    if( orderType || orderDirection ){
      return orderBy(filteredBooks, orderType, orderDirection);
    } else {
      return filteredBooks;
    }
  }, [availableBooks, orderType, orderDirection, nameFilter]);

  const currentlyReadingBooks = useMemo(() => {
    const filteredBooks = filterBy(availableBooks, 'reading', nameFilter);

    if( orderType || orderDirection ){
      return orderBy(filteredBooks, orderType, orderDirection);
    } else {
      return filteredBooks;
    }
  }, [availableBooks, orderType, orderDirection, nameFilter]);

  const readBooks = useMemo(() => {
    const filteredBooks = filterBy(availableBooks, 'read', nameFilter);

    if( orderType || orderDirection ){
      return orderBy(filteredBooks, orderType, orderDirection);
    } else {
      return filteredBooks;
    }
  }, [availableBooks, orderType, orderDirection, nameFilter]);

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
        <BooksContainer booksProps={uncategorizedBooks}>
          <SectionTitle><Link to="/">Uncategorized Books</Link></SectionTitle>
        </BooksContainer>
        <BooksContainer booksProps={wantToReadBooks}>
          <SectionTitle><Link to="/want-to-read-books">Want to read Books</Link></SectionTitle>
        </BooksContainer>
        <BooksContainer booksProps={currentlyReadingBooks}>
          <SectionTitle><Link to="/currently-reading-books">Currently reading books Books</Link></SectionTitle>
        </BooksContainer>
        <BooksContainer booksProps={readBooks}>
          <SectionTitle><Link to="/read-books">Read Books</Link></SectionTitle>
        </BooksContainer>
      </Content>
    </Container>
  );
};

const mapStateToProps = (state: Statex) => ({
  books: state.books.data,
});

export default connect(mapStateToProps)(Dashboard);
