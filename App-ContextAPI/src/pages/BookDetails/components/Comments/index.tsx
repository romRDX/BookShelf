import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useComments } from '../../../../hooks/commentsContext';
import { useBooks } from '../../../../hooks/booksContext';

import orderBy from '../../../../utils/orderBy';

import Input from '../../../../components/Input';
import TextArea from '../../../../components/TextArea';
import Comment from './components/comment';

import { Form } from '@unform/web';

import { IComment } from '../../../../store/ducks/comments/types';

import { Container, Content, AddCommentSection, CommentsSection } from './styles';

interface StateProps {
  setIsOpen: (comment: IComment) => void;
}

const Comments: React.FC<StateProps> = ({ setIsOpen }) => {
  const [bookComments, setBookComments] = useState<IComment[]>([]);

  const {  contextComments, createComment } = useComments();
  const { selectedBook } = useBooks();

  useEffect(() => {
    setBookComments( contextComments.filter( comment => comment.parentId === selectedBook.id) );
  }, [contextComments, selectedBook])
  const [ commentError, setCommentError] = useState(false);

  const handleSubmit = useCallback((comment: IComment) => {
    if(comment.author.length < 2 || comment.body.length < 2){
      setCommentError(true);
      return;
    }
    setCommentError(false);

    const newComment = {
      ...comment,
      parentId: selectedBook.id
    }

    createComment(newComment);
  }, [selectedBook, createComment]);

  const formattedComments = useMemo(() => {
    const thisBookComments = bookComments.filter( (comment: IComment) => comment.parentId === selectedBook.id);
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
            <button type="submit" data-testid="add-comment-button">Publish</button>
            { commentError && <p>Title, Author and description should have at least 2 characters.</p>}
          </Form>
        </AddCommentSection>
      </Content>
    </Container>
  );
};

export default Comments;
