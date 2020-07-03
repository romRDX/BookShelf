import React, { createContext, useCallback, useState, useContext } from 'react';
import { IComment } from '../store/ducks/comments/types';
import commentsInitialState from '../store/ducks/comments/initialState';

import * as commentStore from '../services/commentStore';

interface CommentContextData {
  selectedComment: IComment;
  contextComments: IComment[];
  setSelectedComment(Comment: IComment): void;
  createComment(newComment: IComment): void;
  updateComment(data: IComment): void;
  deleteComment(id: string): void;
}

const CommentContext = createContext<CommentContextData>({} as CommentContextData);

export const CommentProvider: React.FC = ({ children }) => {
  const [selectedComment, setSelectedComment] = useState<IComment>({} as IComment);
  const [availableComments, setAvailableComments] = useState<any>(() => {
    const storedComments = localStorage.getItem('Sheetgo/Comments');

    if(storedComments){
      return JSON.parse(storedComments);
    } else {
      localStorage.setItem('Sheetgo/Comments', JSON.stringify(commentsInitialState))
      return commentsInitialState;
    }
  });

  const createComment = useCallback( (newComment: IComment) => {
    // Update local storage state with the new created Comment
    const createdComment = commentStore.post(newComment);
    setAvailableComments([...availableComments, {...createdComment}]);
  }, [availableComments, setAvailableComments]);

  const updateComment = useCallback((updatedComment: IComment) => {
    const updatedStoredBooks = availableComments.map( (comment: IComment) => {
      if(comment.id === updatedComment.id){
        return updatedComment;
      } else {
        return comment;
      }
    })

    commentStore.patch(updatedComment);
    setAvailableComments(updatedStoredBooks);
    setSelectedComment(updatedComment);
  }, [availableComments, setAvailableComments, setSelectedComment]);

  const deleteComment = useCallback( (id: string) => {
    const updatedComments = availableComments.map( (comment: IComment) => {
      if(comment.id === id){
        return {
          ...comment,
          deleted: true
        }
      } else {
        return comment;
      }
    })

    setAvailableComments(updatedComments);
    commentStore.deleteComment(id);
  }, [availableComments]);

  return (
    <CommentContext.Provider
      value={{
        selectedComment,
        contextComments: availableComments,
        setSelectedComment,
        updateComment,
        deleteComment,
        createComment
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export function useComments(): CommentContextData {
  const context = useContext(CommentContext);

  if (!context) {
    throw new Error('useComments must be used within an authProvider');
  }

  return context;
}
