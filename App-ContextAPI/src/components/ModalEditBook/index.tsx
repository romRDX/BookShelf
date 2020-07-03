import React, { useRef, useCallback } from 'react';

import * as categoryStore from '../../services/categoryStore';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import InputRadio from '../InputRadio';
import TextArea from '../TextArea';

import { IBook } from '../../store/ducks/books/types';
import { useBooks } from '../../hooks/booksContext';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

const ModalEdiBook: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const formRef = useRef<FormHandles>(null);

  const {selectedBook, updateBook} = useBooks();

  const handleSubmit = useCallback((data: IBook) => {
      const formattedData = {
        ...selectedBook,
        ...data,
        category: data.category[0]
      }

      updateBook(formattedData);
      setIsOpen();
    },
    [setIsOpen, selectedBook, updateBook],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={selectedBook}>
        <h1>Edit Book</h1>

        <Input name="title" placeholder="Title" />
        <Input name="author" placeholder="Author" />
        <InputRadio name="category" checkedValue={selectedBook.category} options={Object.entries(categoryStore.get())} />
        <TextArea name="description" placeholder="Description" rows={9} cols={85}/>

        <button type="submit" data-testid="edit-book-button">
          <div className="text">Apply</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEdiBook;
