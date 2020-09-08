import { CommentsTypes } from './types';

/**
 * Actions to update the global state
 */
export const createComment = (newComment) => { return {type: CommentsTypes.CREATE_COMMENT, newComment: newComment}};
export const editComment = (comment) => { return {type: CommentsTypes.EDIT_COMMENT, newComment: comment}};
export const deleteComment = (commentId) => { return {type: CommentsTypes.DELETE_COMMENT, commentId: commentId}};

