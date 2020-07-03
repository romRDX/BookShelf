import React, { useRef, useCallback, useEffect, useState } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import TextArea from '../TextArea';

import { IComment } from '../../store/ducks/comments/types';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: (comment?: IComment) => void;
  handleEditComment: (comment: IComment) => void;
  editingComment: IComment;
}

interface IEditFoodData {
  name: string;
  image: string;
  price: string;
  description: string;
}

const ModalEditFood: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  editingComment,
  handleEditComment,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [ editCommentError, setEditCommentError] = useState(false);

  useEffect(() => {
    formRef.current?.setData({ author: editingComment.author, body: editingComment.body  });
  }, [editingComment.author, editingComment.body]);

  const handleSubmit = useCallback((data: IComment) => {
    if(data.author.length < 2 ||
      data.body.length < 2
    ){
      setEditCommentError(true);
      return;
    }
      handleEditComment(data);
      setIsOpen();
    },
    [handleEditComment, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingComment}>
        <h1>Edit Comment</h1>

        <Input name="author" placeholder="Name" />
        <TextArea name="body" placeholder="Comment" rows={9} cols={85} />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Apply</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
        { editCommentError && <p>Name and body should both have at least 2 characters.</p>}
      </Form>
    </Modal>
  );
};

export default ModalEditFood;
