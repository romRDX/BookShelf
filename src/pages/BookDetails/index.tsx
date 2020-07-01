import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createBook } from '../../store/ducks/books/actions';
import * as bookStore from '../../services/bookStore';

import 'react-day-picker/lib/style.css';
import {
  Container,
  Content,
} from './styles';

import Details from './components/Details';
import Comments from './components/Comments';

import ModalAddBook from '../../components/ModalAddBook';
import ModalEditComment from '../../components/ModalEditComment';

import Header from './components/Header';

import { IBook } from '../../store/ducks/books/types';
import { IComment } from '../../store/ducks/comments/types';
import { useHistory } from 'react-router-dom';
import { createComment, editComment } from '../../store/ducks/comments/actions';

interface Statex {
  location: {
    state: IBook;
  }
  dispatch: Dispatch;
}

const BookDetails: React.FC<Statex> = ({location, dispatch}) => {
  const history = useHistory();

  const [selectedBook, setSelectedBook] = useState<IBook>({} as IBook);
  const [editingBook, setEditingBook] = useState<IBook>({} as IBook);
  const [editingComment, setEditingComment] = useState<IComment>({} as IComment);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(()=> {
    setSelectedBook(location.state);
  }, [location.state]);

  const toggleModal = useCallback( (): void => {
    setModalOpen(!modalOpen);
  },[setModalOpen, modalOpen]);

  const toggleEditModal = useCallback( (comment?: IComment): void => {
    if(comment){
      setEditingComment(comment);
    }
    setEditModalOpen(!editModalOpen);
  },[setEditModalOpen, editModalOpen, setEditingComment]);

  const handleAddBook = useCallback( (newBook: IBook) => {
    dispatch(createBook(newBook));
    history.push('book-details', newBook);

  }, [dispatch]);

  const handleEditComment = useCallback( (updatedComment: IComment) => {
    dispatch(editComment({...editingComment, ...updatedComment}));

  }, [dispatch, editingComment, editComment]);

  return (
    <Container>
      <Header toggleModal={toggleModal} orderBy={false} />

      <ModalAddBook
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddBook={handleAddBook}
      />

      <ModalEditComment
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        handleEditComment={handleEditComment}
        editingComment={editingComment}
      />

      <Content>
        <Details selectedBook={selectedBook}></Details>
        <Comments selectedBook={selectedBook} setIsOpen={toggleEditModal}></Comments>
      </Content>
    </Container>
  );
};

export default connect()(BookDetails);
