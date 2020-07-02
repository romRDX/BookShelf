import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import TextArea from '../TextArea';
import bookImage from '../../assets/book.jpg';
import { v4 as uuid } from 'uuid';

import { IBook } from '../../store/ducks/books/types';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddBook: (book: IBook) => void;
}

const ModalAddBook: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddBook,
}) => {
  const formRef = useRef<FormHandles>(null);

  const categoryStore = {
    wantToRead: 'Want to Read',
    reading: 'Currently reading',
    read: 'Read'
  }

  const handleSubmit = useCallback((book: IBook) => {

      const newBook = {
        ...book,
        id: uuid(),
        img: bookImage,
        created_at: new Date(Date.now()),
        category: 'uncategorized',
        deleted: false,
      }

      handleAddBook(newBook);
      setIsOpen();
    }, [handleAddBook, setIsOpen]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>New Book</h1>

        <Input name="title" placeholder="Title" />
        <Input name="author" placeholder="Author" />
        <TextArea name="description" placeholder="Description" rows={9} cols={85}/>

        <button type="submit" data-testid="add-book-button">
          <p className="text">Add Book</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddBook;
