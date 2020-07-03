import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { createComment, editComment, deleteComment } from '../../../../store/ducks/comments/actions';
import * as commentStore from '../../../../services/commentStore';
import orderBy from '../../../../utils/orderBy';

import Input from '../../../../components/Input';
import TextArea from '../../../../components/TextArea';
import Comment from './components/comment';

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
  const [commentError, setCommentError] = useState(false);

  useEffect(()=>{
    commentStore.put(comments);
  },[comments]);

  useEffect(()=>{
    setBookComments(comments);
  },[comments]);

  const handleSubmit = useCallback((comment: IComment, { reset }) => {
    if(comment.author.length < 2 || comment.body.length < 2){
      setCommentError(true);
      return 0;
    }

    setCommentError(false);

    const newComment = {
      ...comment,
      parentId: selectedBook.id
    }

    const formattedComment = commentStore.post(newComment);
    dispatch(createComment(formattedComment));
    reset();
  }, [selectedBook, dispatch]);

  const handleEditComment = useCallback( (updatedComment: IComment) => {
    dispatch(editComment(updatedComment));
  }, [dispatch]);

  const handleDeleteComment = useCallback( (commentId: string) => {
    dispatch(deleteComment(commentId));
    commentStore.deleteComment(commentId);
  }, [dispatch]);

  const formattedComments = useMemo(() => {
    const thisBookComments = bookComments.filter( comment => comment.parentId === selectedBook.id);
    return orderBy(thisBookComments, 'DATE', 'ASC');
  }, [bookComments, selectedBook]);

  return (
    <Container>
      <Content>
        <h3>Comments</h3>
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
        <h3>Add your comment</h3>
          <Form onSubmit={handleSubmit}>
            <Input name="author" placeholder="Type your name" />
            <TextArea name="body" placeholder="Type your comment here" rows={9} cols={85} />
            <button type="submit" data-testid="add-book-button">Publish</button>
          </Form>
          { commentError && <p>Name and body should have at least 3 characters each!</p> }
        </AddCommentSection>
      </Content>
    </Container>
  );
};

const mapStateToProps = (state: State) => ({
  comments: state.comments.data,
});

export default connect(mapStateToProps)(Comments);
