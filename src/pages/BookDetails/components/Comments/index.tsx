import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Container, Content, AddCommentSection, CommentsSection, Comment } from './styles';

import Input from '../../../../components/Input';
import TextArea from '../../../../components/TextArea';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { AccountCircle } from '@material-ui/icons';

interface Book {
  id: string;
  img: string;
  created_at: Date;
  title: string;
  description: string;
  author: string;
  category: string;
  deleted: boolean;
}

interface EditingBookProps {
  editingBook: Book;
}

interface newComment {
  name: string;
}

interface ICreateComment {
  id: string;
  img: string;
  created_at: Date;
  title: string;
  description: string;
  author: string;
  category: string;
  deleted: boolean;
}

const Comments: React.FC = () => {

  // const handleSubmit = useCallback((book: ICreateBook) => {
  //   console.log('a: ', book);
  // }, []);
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback((comment: ICreateComment) => {

    console.log(comment);

  },
  [formRef],
);

  const formattedDate = useMemo(() => {

  }, []);

  return (
    <Container>
      <Content>
        <AddCommentSection>
          <strong>Comments</strong>
          <Form onSubmit={handleSubmit}>
            <Input name="commentName" placeholder="Type your name" />
            <TextArea name="commentText" placeholder="Type your comment here" rows={9} cols={85} />
            <button type="submit" data-testid="add-book-button">Publish</button>
          </Form>
        </AddCommentSection>
        <CommentsSection>
          <Comment>
            <AccountCircle />
            <div>
              <strong>Teste</strong>
              <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a blandit augue, ullamcorper hendrerit nibh. Sed finibus porttitor massa ut ultrices. Nullam at purus arcu. Aenean consectetur urna non lectus malesuada, vel tincidunt dolor venenatis.</p>
            </div>
          </Comment>
          <Comment>
            <AccountCircle />
            <div>
              <strong>Teste</strong>
              <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a blandit augue, ullamcorper hendrerit nibh. Sed finibus porttitor massa ut ultrices. Nullam at purus arcu. Aenean consectetur urna non lectus malesuada, vel tincidunt dolor venenatis.</p>
            </div>
          </Comment>
        </CommentsSection>
      </Content>
    </Container>
  );
};

export default Comments;
