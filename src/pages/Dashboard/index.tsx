import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { createBook } from '../../store/ducks/books/actions';
import * as bookStore from '../../services/bookStore';

import orderBy from '../../utils/orderBy';
import filterBy from '../../utils/filterBy';

import ModalAddBook from '../../components/ModalAddBook';
import Header from '../../components/Header';
import BooksContainer from '../../components/BooksContainer';
import { CollectionsBookmark } from '@material-ui/icons';
import { FiBook, FiBookOpen } from 'react-icons/fi';

import { Container, Content, SectionTitle } from './styles';

import { IBook } from '../../store/ducks/books/types';
import { Props, State} from './types';

const Dashboard: React.FC<Props> = ({books, dispatch}) => {
  const [availableBooks, setAvailableBooks] = useState<IBook[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [orderType, setOrderType] = useState('A-Z');
  const [orderDirection, setOrderDirection] = useState('ASC');
  const [nameFilter, setNameFilter] = useState('');
  const [selectedView,setSelectedView] = useState('home');

  // Updates availableBooks state whenever there is a change on global state
  useEffect(()=> {
      setAvailableBooks(books);
  }, [books]);

  // Update local storage state whenever there is a change on availableBooks local state
  useEffect(()=>{
    bookStore.put(availableBooks);
  },[availableBooks]);

  // Modal toggle open/close
  const toggleModal = useCallback( (): void => {
    setModalOpen(!modalOpen);
  },[setModalOpen, modalOpen]);


  const handleAddBook = useCallback( (newBook: IBook): void => {
    // Update local storage state with the new created book
    const createdBook = bookStore.post(newBook);

    // Update global redux storage state with the new created book
    dispatch(createBook(createdBook));
  }, [dispatch]);

  const handleChangeView = useCallback( (view: string) => {
    setSelectedView(view);
  },[]);

  /* All constants below creates formatted books arrays already filtered by category
  *  and possibly also filtered by name and ordened by Date or A-Z
  */
  const uncategorizedBooks = useMemo(() => {
    const filteredBooks = filterBy(availableBooks, 'uncategorized', nameFilter);
    return orderBy(filteredBooks, orderType, orderDirection);
  }, [availableBooks, orderType, orderDirection, nameFilter]);

  const wantToReadBooks = useMemo(() => {
    const filteredBooks = filterBy(availableBooks, 'wantToRead', nameFilter);
    return orderBy(filteredBooks, orderType, orderDirection);
  }, [availableBooks, orderType, orderDirection, nameFilter]);

  const currentlyReadingBooks = useMemo(() => {
    const filteredBooks = filterBy(availableBooks, 'reading', nameFilter);
    return orderBy(filteredBooks, orderType, orderDirection);
  }, [availableBooks, orderType, orderDirection, nameFilter]);

  const readBooks = useMemo(() => {
    const filteredBooks = filterBy(availableBooks, 'read', nameFilter);
    return orderBy(filteredBooks, orderType, orderDirection);
  }, [availableBooks, orderType, orderDirection, nameFilter]);

  return (
    <Container>
      <Header
        toggleModal={toggleModal}
        setOrderType={setOrderType}
        setOrderDirection={setOrderDirection}
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
        handleChangeView={handleChangeView}
        orderBy
      />

      <ModalAddBook
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddBook={handleAddBook}
      />

      <Content>
        { selectedView === 'home' &&
          <BooksContainer booksProps={uncategorizedBooks}>
            <SectionTitle onClick={() => setSelectedView('home')}>Uncategorized Books</SectionTitle>
          </BooksContainer>
        }

        { (selectedView === 'home' || selectedView === 'wantToRead') &&
          <BooksContainer booksProps={wantToReadBooks}>
            <SectionTitle onClick={() => setSelectedView('wantToRead')}>Want to read Books <CollectionsBookmark /></SectionTitle>
          </BooksContainer>
        }

        { (selectedView === 'home' || selectedView === 'currentlyReading') &&
          <BooksContainer booksProps={currentlyReadingBooks}>
            <SectionTitle onClick={() => setSelectedView('currentlyReading')}>Currently reading books Books<FiBookOpen /></SectionTitle>
          </BooksContainer>
        }

        { (selectedView === 'home' || selectedView === 'read') &&
          <BooksContainer booksProps={readBooks}>
            <SectionTitle onClick={() => setSelectedView('read')}>Read Books<FiBook /></SectionTitle>
          </BooksContainer>
        }
      </Content>
    </Container>
  );
};

const mapStateToProps = (state: State) => ({
  books: state.books.data,
});

export default connect(mapStateToProps)(Dashboard);
