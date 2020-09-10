import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createBook, deleteBook, editBook } from '../../store/ducks/books/actions';
import  * as bookStore from '../../services/bookStore';

import 'react-day-picker/lib/style.css';
import {
  Container,
  Content,
} from './styles';

import Details from './components/Details';
import Comments from './components/Comments';

import ModalAddBook from '../../components/ModalAddBook';
import ModalEditBook from '../../components/ModalEditBook';
import ModalEditComment from '../../components/ModalEditComment';
import GoBackButton from '../../components/GoBackButton';

import Header from '../../components/Header';

import { IBook } from '../../store/ducks/books/types';
import { IComment } from '../../store/ducks/comments/types';
import { useHistory } from 'react-router-dom';
import { editComment } from '../../store/ducks/comments/actions';

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
  const [editBookModalOpen, setEditBookModalOpen] = useState(false);
  const [editCommentModalOpen, setEditCommentModalOpen] = useState(false);


  useEffect(()=> {
    setSelectedBook(location.state);
  }, [location.state]);


  const toggleModal = useCallback( (): void => {
    setModalOpen(!modalOpen);
  },[setModalOpen, modalOpen]);


  const toggleEditCommentModal = useCallback( (comment?: IComment): void => {
    if(comment){
      setEditingComment(comment);
    }
    setEditCommentModalOpen(!editCommentModalOpen);
  },[setEditCommentModalOpen, editCommentModalOpen, setEditingComment]);


  const toggleEditBookModal = useCallback( (book?: IBook): void => {
    if(book){
      setEditingBook(book);
    }
    setEditBookModalOpen(!editBookModalOpen);
  },[setEditBookModalOpen, editBookModalOpen, setEditingBook]);


  const handleAddBook = useCallback( (newBook: IBook) => {
    const createdBook = bookStore.post(newBook);

    // Update global redux storage state with the new created book
    dispatch(createBook(createdBook));
    // dispatch(createBook(newBook));
    history.push('book-details', createdBook);
  }, [dispatch, history]);


  const handleEditBook = useCallback( (updatedBook: IBook) => {
    // comment
    bookStore.patch(updatedBook);
    dispatch(editBook(updatedBook));
    setSelectedBook(updatedBook);

  }, [dispatch, setSelectedBook]);


  const handleDeleteBook = useCallback((bookId: string) =>{
    dispatch(deleteBook(bookId));
    history.push('/dashboard');
  }, [history, dispatch]);


  const handleEditComment = useCallback( (updatedComment: IComment) => {
    // comment
    dispatch(editComment({...editingComment, ...updatedComment}));
  }, [dispatch, editingComment]);

  const handleChangeView = useCallback( (view: string) => {
    history.push('/dashboard', view);
  }, [history]);


  return (
    <Container>
      <Header toggleModal={toggleModal} orderBy={false} handleChangeView={handleChangeView} />

      <ModalAddBook
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddBook={handleAddBook}
      />

      <ModalEditComment
        isOpen={editCommentModalOpen}
        setIsOpen={toggleEditCommentModal}
        handleEditComment={handleEditComment}
        editingComment={editingComment}
      />

      <ModalEditBook
        isOpen={editBookModalOpen}
        setIsOpen={toggleEditBookModal}
        handleEditBook={handleEditBook}
        editingBook={editingBook}
      />

      <Content>
        <Details setIsOpen={toggleEditBookModal} selectedBook={selectedBook} handleDeleteBook={handleDeleteBook}></Details>
        <Comments selectedBook={selectedBook} setIsOpen={toggleEditCommentModal}></Comments>
        <GoBackButton />
      </Content>
    </Container>
  );
};

export default connect()(BookDetails);
