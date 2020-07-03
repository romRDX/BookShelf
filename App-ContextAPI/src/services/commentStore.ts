/**
 * Local Storage Comments Service.
 * Manipulate the comments object in local storage.
 */
import { v4 as uuid } from 'uuid';
import { IComment } from '../store/ducks/comments/types';

// Create a comment within local storage
export const post = (newComment: IComment) => {
  const storedComments = get();

  const formattedComment = {
    ...newComment,
    id: uuid(),
    created_at: Date.now(),
    deleted: false,
  }

  if(storedComments){
    const newStoredComments = [...storedComments, formattedComment];
    localStorage.setItem('Sheetgo/Comments', JSON.stringify(newStoredComments));
  } else {
    const newCommentsStore = [ formattedComment ];
    localStorage.setItem('Sheetgo/Comments', JSON.stringify(newCommentsStore));
  }

  return formattedComment;
};

// Get all comments from local storage
export const get = () => {
  const commentStore = localStorage.getItem('Sheetgo/Comments');

  if(commentStore){
    return JSON.parse(commentStore);
  }
};

// Update all comments from local storage
export const put = (comments: IComment[]) => {
  localStorage.removeItem('Sheetgo/Comments')
  localStorage.setItem('Sheetgo/Comments', JSON.stringify(comments));
};

// Update a single comment from local storage
export const patch = (updatedComment: IComment) => {
  const storedComments = get();

  const updatedStoredComments = storedComments.map( (comment: IComment) => {
    if(comment.id === updatedComment.id){
      return updatedComment;
    } else {
      return comment;
    }
  })

  localStorage.setItem('Sheetgo/Comments', JSON.stringify(updatedStoredComments));
};

// Delete a comment from local storage
export const deleteComment = (commentId: string) => {
  const comments = get();

  const updatedComments = comments.map( (comment: IComment) => {
    if(comment.id === commentId){
      return {
        ...comment,
        deleted: true
      }
    } else {
      return comment;
    }
  })

  put(updatedComments);
};
