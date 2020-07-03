import React, { useState, useMemo } from 'react';
import * as categoryStore from '../../../../services/categoryStore';


import { Container, Content, BookInfo, Options } from './styles';
import { Edit, Delete} from '@material-ui/icons';

import {IBook} from '../../../../store/ducks/books/types';


interface SelectedBookProps {
  selectedBook: IBook;
  handleDeleteBook: (bookId: string) => void;
  setIsOpen: (book?: IBook) => void;
}

const Details: React.FC<SelectedBookProps> = ({
  selectedBook,
  handleDeleteBook,
  setIsOpen,
}) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const formattedDate = useMemo(() => {
    const date = new Date(selectedBook.created_at)
    return date.toLocaleDateString();
  }, [selectedBook]);

  const formattedCategory = useMemo(() => {
    return categoryStore.get()[selectedBook.category];
  }, [selectedBook]);

  return (
    <Container>
      <Content>
        <Options>
          <button onClick={() => setIsOpen(selectedBook)}>Edit Book <Edit /></button>
          { deleteConfirmation ?
            <div>
              <span>Are you sure?</span>
              <button onClick={()=> handleDeleteBook(selectedBook.id)}>Yes</button>
              <button onClick={() => setDeleteConfirmation(false)}>No</button>
            </div> :
            <button onClick={() => setDeleteConfirmation(true)}>Delete Book <Delete /></button>
          }
        </Options>
        <img src={selectedBook.img} alt={selectedBook.title} />

        <BookInfo>
          <strong>{selectedBook.title}</strong>
          <span>Author: {selectedBook.author}</span>
          <span>Published: {formattedDate}</span>
          <span>Category: {formattedCategory}</span>
          <p>Description: <br/> {selectedBook.description}</p>
        </BookInfo>
      </Content>
    </Container>
  );
};

export default Details;
