import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import bookImage from '../../assets/book.jpg';
import { v4 as uuid } from 'uuid';

import { Book } from '../../store/ducks/books/types';

interface ICreateBookBook {
  id: string;
  img: string;
  timestamp: number;
  title: string;
  description: string;
  author: string;
  category: string;
  deleted: boolean;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddBook: (book: Book) => void;
}

const ModalAddBook: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddBook,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback((book: ICreateBookBook) => {

      const newBook = {
        ...book,
        id: uuid(),
        img: bookImage,
        timestamp: Date.now(),
        category: '',
        deleted: false,
      }

      handleAddBook(newBook);
      setIsOpen();
    },
    [handleAddBook, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>New Book</h1>

        <Input name="title" placeholder="Title" />
        <Input name="author" placeholder="Author" />
        <Input name="description" placeholder="Description" />

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
