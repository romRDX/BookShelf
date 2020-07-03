import React from 'react';
import { BookProvider } from './booksContext';
import { CommentProvider } from './commentsContext';

const AppProvider: React.FC = ({ children }) => (
  <BookProvider>
    <CommentProvider>{children}</CommentProvider>
  </BookProvider>
);

export default AppProvider;
