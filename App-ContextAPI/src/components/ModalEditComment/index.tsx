import React, { useRef, useCallback, useState } from 'react';

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
  const [addCommentError, setAddCommentError] = useState(false);
  const { selectedComment, updateComment } = useComments();

  const handleSubmit = useCallback((data: IComment) => {
      if(data.author.length < 2 ||
        data.body.length < 2
      ){
        setAddCommentError(true);
        return;
      }
      setAddCommentError(false);

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

        <button type="submit" data-testid="edit-comment-button">
          <div className="text">Apply</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
        { addCommentError && <p>Title, Author and description should have at least 2 characters.</p>}
      </Form>
    </Modal>
  );
};

export default ModalEditBook;
