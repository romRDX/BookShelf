import React, { useRef, useCallback, useState } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import TextArea from '../TextArea';

import { IBook } from '../../store/ducks/books/types';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddBook: (book: any) => void;
}

const ModalAddBook: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddBook,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [ addBookError, setAddBookError] = useState<boolean>(false);

  const handleSubmit = useCallback((book: IBook): any => {
      if(
          book.author.length < 2 ||
          book.title.length < 2 ||
          book.description.length < 2
        ){
        setAddBookError(true);
        return;
      }

      setAddBookError(false);

      handleAddBook(book);
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
       { addBookError && <span>Title, Author and description should have at least 3 characters</span>}
      </Form>
    </Modal>
  );
};

export default ModalAddBook;
