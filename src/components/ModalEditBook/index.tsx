import React, { useRef, useCallback, useState } from 'react';

import * as categoryStore from '../../services/categoryStore';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import InputRadio from '../InputRadio';
import TextArea from '../TextArea';

import { IBook } from '../../store/ducks/books/types';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleEditBook: (book: IBook) => void;
  editingBook: IBook;
}

const ModalEditFood = ({
  isOpen,
  setIsOpen,
  editingBook,
  handleEditBook,
}: IModalProps) => {
  const formRef = useRef<FormHandles>(null);

  const [ editBookError, setEditBookError] = useState(false);

  const handleSubmit = useCallback((data: IBook) => {
      if(data.author.length < 2 ||
        data.title.length < 2 ||
        data.description.length < 2
      ){
        setEditBookError(true);
        return;
      }

      const formattedData = {
        ...editingBook,
        ...data,
        category: data.category[0]
      }

      handleEditBook(formattedData);
      setIsOpen();
    },
    [handleEditBook, setIsOpen, editingBook],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingBook}>
        <h1>Edit Book</h1>

        <Input name="title" placeholder="Title" />
        <Input name="author" placeholder="Author" />
        <InputRadio name="category" checkedValue={editingBook.category} options={Object.entries(categoryStore.get())} />
        <TextArea name="description" placeholder="Description" rows={9} cols={85}/>

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
        { editBookError && <span>Title, Author and description should have at least 3 characters</span>}
      </Form>
    </Modal>
  );
};

export default ModalEditFood;
