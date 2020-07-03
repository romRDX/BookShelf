import React, { useState, useCallback } from 'react';
import { useBooks } from '../../hooks/booksContext';

import { Container, Content } from './styles';

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
import { useComments } from '../../hooks/commentsContext';

interface State {
  location: {
    state: IBook;
  }
}

const BookDetails: React.FC<State> = () => {
  const history = useHistory();
  const { selectedBook, setSelectedBook } = useBooks();

  const [modalOpen, setModalOpen] = useState(false);
  const [editBookModalOpen, setEditBookModalOpen] = useState(false);
  const [editCommentModalOpen, setEditCommentModalOpen] = useState(false);

  const { setSelectedComment } = useComments();
  const { deleteBook } = useBooks();

  const toggleModal = useCallback( (): void => {
    setModalOpen(!modalOpen);
  },[setModalOpen, modalOpen]);

  // Set a comment to be edited and open its modal
  const toggleEditCommentModal = useCallback( (comment?: IComment): void => {
    if(comment){
      setSelectedComment(comment);
    }
    setEditCommentModalOpen(!editCommentModalOpen);
  },[setEditCommentModalOpen, editCommentModalOpen, setSelectedComment]);

  // Set open the book edit modal
  const toggleEditBookModal = useCallback( (book?: IBook): void => {
    setEditBookModalOpen(!editBookModalOpen);
  },[setEditBookModalOpen, editBookModalOpen, setSelectedBook]);

  // Create a book, updates redux global state and updates the state of the book details view
  const handleAddBook = useCallback( (newBook: IBook) => {

    history.push('book-details', newBook);
  }, [history]);

  // Delete a book, update it at redux global state an sends user back to dashboard
  const handleDeleteBook = useCallback((bookId: string) =>{
    deleteBook(bookId);
    history.push('/dashboard');
  }, [history]);

  // Changes the view by going back to dashboard and setting a new view state
  const handleChangeView = useCallback( (view: string) => {
    history.push('/dashboard', view);
  }, [history]);

  return (
    <Container>
      <Header
        toggleModal={toggleModal}
        orderBy={false}
        handleChangeView={handleChangeView}
      />

      <ModalAddBook
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddBook={handleAddBook}
      />

      <ModalEditComment
        isOpen={editCommentModalOpen}
        setIsOpen={toggleEditCommentModal}
      />

      <ModalEditBook
        isOpen={editBookModalOpen}
        setIsOpen={toggleEditBookModal}
      />

      <Content>
        <Details setIsOpen={toggleEditBookModal} selectedBook={selectedBook} handleDeleteBook={handleDeleteBook}></Details>
        <Comments setIsOpen={toggleEditCommentModal}></Comments>
        <GoBackButton />
      </Content>
    </Container>
  );
};

export default BookDetails;
