import { action } from 'typesafe-actions';
import { CommentsTypes, IComment } from './types';

/**
 * Actions to update the global state
 */
// export const createComment = (newComment) => { return {type: CommentsTypes.CREATE_COMMENT, newComment: newComment}};
// export const editComment = (comment) => { return {type: CommentsTypes.EDIT_COMMENT, newComment: comment}};
// export const deleteComment = (commentId) => { return {type: CommentsTypes.DELETE_COMMENT, commentId: commentId}};

export const createComment = (newComment: IComment) => action(CommentsTypes.CREATE_COMMENT, { newComment });
export const editComment = (newComment: IComment) => action(CommentsTypes.EDIT_COMMENT, { newComment });
export const deleteComment = (commentId: string) => action(CommentsTypes.DELETE_COMMENT, { commentId });
