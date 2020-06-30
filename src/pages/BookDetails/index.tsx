import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createBook } from '../../store/ducks/books/actions';
import * as bookStore from '../../services/bookStore';

import 'react-day-picker/lib/style.css';
import {
  Container,
  Content,
  SectionTitle,
} from './styles';

import Details from './components/Details';
import Comments from './components/Comments';

import ModalAddBook from '../../components/ModalAddBook';

import Header from './components/Header';
// import BooksContainer from './components/BooksContainer';

import { Book } from '../../store/ducks/books/types';

interface Statex {
  location: {
    state: Book;
  }
}

const BookDetails: React.FC<Statex> = ({location}) => {
  const [editingBook, setEditingBook] = useState<Book>({} as Book);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(()=> {
    setEditingBook(location.state);

  }, [location.state]);

  const toggleModal = useCallback( (): void => {
    setModalOpen(!modalOpen);
  },[setModalOpen, modalOpen]);

  return (
    <Container>
      <Header toggleModal={toggleModal} orderBy={false} />

      {/* <ModalAddBook
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddBook={handleAddBook}
      /> */}

      <Content>
        <Details editingBook={editingBook}></Details>
        <Comments></Comments>
      </Content>
    </Container>
  );
};

export default BookDetails;
