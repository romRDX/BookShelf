import { Reducer } from 'redux';

import { CommentsTypes, CommentsState } from './types';

import initialState from './initialState';

import * as commentStore from '../../../services/commentStore';

const storedComments = commentStore.get();

const INITIAL_STATE = {
  data: storedComments ? storedComments : initialState,
};

const reducer: Reducer<CommentsState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CommentsTypes.CREATE_COMMENT:
      return {
        ...state,
        data: [...state.data, action.payload.newComment],
      };

    case CommentsTypes.EDIT_COMMENT: {
      const newData = state.data.map( (comment) => {
        if ( comment.id === action.payload.newComment.id) {
          return action.payload.newComment;
        } else {
          return comment;
        }
      });

      return {
        ...state,
        data: newData
      }
    }

    case CommentsTypes.DELETE_COMMENT: {
      const newData = state.data.map( (comment) => {
        if ( comment.id === action.payload.commentId) {
          return {
            ...comment,
            deleted: true
          };
        } else {
          return comment;
        }
      });

      return {
        ...state,
        data: newData
      }
    }

    default:
      return state;
  }
};

export default reducer;
