import React, { useRef, useCallback, useEffect } from 'react';

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

  useEffect(() => {
    formRef.current?.setData({ author: editingComment.author, body: editingComment.body  });
    // formRef.current?.setData({   });
  }, [editingComment.author, editingComment.body]);

  const handleSubmit = useCallback(
    async (data: IComment) => {
      // EDIT A FOOD PLATE AND CLOSE THE MODAL
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
      </Form>
    </Modal>
  );
};

export default ModalEditFood;
