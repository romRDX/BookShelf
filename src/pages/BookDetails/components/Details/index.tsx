import React, { useState, useEffect, useMemo } from 'react';
import { Container, Content, BookInfo } from './styles';

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

interface SelectedBookProps {
  selectedBook: Book;
}

const Details: React.FC<SelectedBookProps> = ({
  selectedBook
}) => {

  const formattedDate = useMemo(() => {
    const date = new Date(selectedBook.created_at)
    return date.toLocaleDateString();
  }, [selectedBook]);

  const formattedCategory = useMemo(() => {
    switch(selectedBook.category) {
      case 'wantToRead':
        return 'Want to read';
      case 'reading':
        return 'Reading'
      case 'read':
          return 'Read'
      default:
        return 'Uncategorized'
    }
  }, [selectedBook]);

  return (
    <Container>
      <Content>
        <img src={selectedBook.img} alt={selectedBook.title} />

        <BookInfo>
          <strong>{selectedBook.title}</strong>
          <span>Author: {selectedBook.author}</span>
          <span>Published: {formattedDate}</span>
          <span>Category: {formattedCategory}</span>
          <p>Description: <br/> {selectedBook.description}</p>
        </BookInfo>
      </Content>
    </Container>
  );
};

export default Details;
