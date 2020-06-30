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

interface EditingBookProps {
  editingBook: Book;
}

const Details: React.FC<EditingBookProps> = ({
  editingBook
}) => {

  const formattedDate = useMemo(() => {
    const date = new Date(editingBook.created_at)
    return date.toLocaleDateString();
  }, [editingBook]);

  const formattedCategory = useMemo(() => {
    switch(editingBook.category) {
      case 'wantToRead':
        return 'Want to read';
      case 'reading':
        return 'Reading'
      case 'read':
          return 'Read'
      default:
        return 'Uncategorized'
    }
  }, [editingBook]);

  return (
    <Container>
      <Content>
        <img src={editingBook.img} alt={editingBook.title} />

        <BookInfo>
          <strong>{editingBook.title}</strong>
          <span>Author: {editingBook.author}</span>
          <span>Published: {formattedDate}</span>
          <span>Category: {formattedCategory}</span>
          <p>Description: <br/> {editingBook.description}</p>
        </BookInfo>
      </Content>
    </Container>
  );
};

export default Details;
