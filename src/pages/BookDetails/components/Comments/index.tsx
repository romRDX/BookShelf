import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { createComment, editComment, deleteComment } from '../../../../store/ducks/comments/actions';
import * as commentStore from '../../../../services/commentStore';
import {orderByDate , orderByAZ} from '../../../../utils/ordenator';

import Input from '../../../../components/Input';
import TextArea from '../../../../components/TextArea';
import Comment from './components/comment';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { IComment } from '../../../../store/ducks/comments/types';
import { IBook } from '../../../../store/ducks/books/types';

import { Container, Content, AddCommentSection, CommentsSection } from './styles';

interface State {
  comments: {
    data: IComment[]
  }
}

interface StateProps {
  comments: IComment[];
  selectedBook: IBook;
  dispatch: Dispatch;
  setIsOpen: (comment: IComment) => void;
}

const Comments: React.FC<StateProps> = ({comments, dispatch, selectedBook, setIsOpen}) => {
  const [bookComments, setBookComments] = useState<IComment[]>([]);

  orderByAZ();

  useEffect(()=>{
    commentStore.put(comments);
  },[comments]);

  useEffect(()=>{
    setBookComments(comments);
  },[comments]);

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback((comment: IComment) => {
    const newComment = {
      ...comment,
      parentId: selectedBook.id
    }

    const formattedComment = commentStore.post(newComment);
    dispatch(createComment(formattedComment));
  }, [selectedBook]);

  const handleEditComment = useCallback( (updatedComment: IComment) => {
    dispatch(editComment(updatedComment));
  }, []);

  const handleDeleteComment = useCallback( (commentId: string) => {
    dispatch(deleteComment(commentId));
    commentStore.deleteComment(commentId);
  }, []);

  const formattedComments = useMemo(() => {
    const thisBookComments = bookComments.filter( comment => comment.parentId === selectedBook.id);
    return orderByDate(thisBookComments, 'asc');
  }, [bookComments, selectedBook]);

  const formatDate = useCallback((created_at: Date) => {
    const date = new Date(created_at);
    return date.toLocaleDateString();
  }, [selectedBook]);

  return (
    <Container>
      <Content>
        <strong>Comments</strong>
        <CommentsSection>
          { formattedComments &&
            formattedComments.map( (comment: IComment) => (
              !comment.deleted &&
              <Comment
                key={comment.id}
                handleEditComment={handleEditComment}
                handleDeleteComment={handleDeleteComment}
                comment={comment}
                setIsOpen={setIsOpen}
              />
            ))
          }
        </CommentsSection>
        <AddCommentSection>
        <strong>Add your comment</strong>
          <Form onSubmit={handleSubmit}>
            <Input name="author" placeholder="Type your name" />
            <TextArea name="body" placeholder="Type your comment here" rows={9} cols={85} />
            <button type="submit" data-testid="add-book-button">Publish</button>
          </Form>
        </AddCommentSection>
      </Content>
    </Container>
  );
};

const mapStateToProps = (state: State) => ({
  comments: state.comments.data,
});

export default connect(mapStateToProps)(Comments);
