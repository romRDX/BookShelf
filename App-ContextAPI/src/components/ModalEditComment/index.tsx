import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import TextArea from '../TextArea';

import { IComment } from '../../store/ducks/comments/types';
import { useComments } from '../../hooks/commentsContext';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

const ModalEditBook: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const formRef = useRef<FormHandles>(null);

  const { selectedComment, updateComment } = useComments();

  const handleSubmit = useCallback((data: IComment) => {
      const updatedComment = {
        ...selectedComment,
        ...data,
      }

      updateComment(updatedComment);
      setIsOpen();
    },
    [setIsOpen, updateComment, selectedComment],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={selectedComment}>
        <h1>Edit Comment</h1>

        <Input name="author" placeholder="Name" />
        <TextArea name="body" placeholder="Comment" rows={9} cols={85} />

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

export default ModalEditBook;
