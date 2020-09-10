/**
 * Local Storage Comments Service.
 * Manipulate the comments object in local storage.
 */
import { v4 as uuid } from 'uuid';
import { IComment } from '../store/ducks/comments/types';

export const post = (newComment: IComment) => {
  const storedComments = get();

  const formattedComment = {
    ...newComment,
    id: uuid(),
    created_at: new Date(Date.now()),
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

export const get = () => {
  const commentStore = localStorage.getItem('Sheetgo/Comments');

  if(commentStore){
    return JSON.parse(commentStore);
  }
};

export const put = (comments: IComment[]) => {
  localStorage.removeItem('Sheetgo/Comments')
  localStorage.setItem('Sheetgo/Comments', JSON.stringify(comments));
};

export const patch = (updatedComment: IComment) => {

  const storedComments = get();

  const updatedStoredCommentss = storedComments.find((comment: IComment) =>
    comment.id === updatedComment.id
  )

  localStorage.setItem('Sheetgo/Comment', JSON.stringify(updatedStoredCommentss));
};

export const deleteComment = (commentId: string) => {
  const comments = get();

  const foundComments = comments.find((comment: IComment) => comment.id === commentId);

  const updatedComments = {
    ...foundComments,
    deleted: true,
  }

  put(updatedComments);
};
