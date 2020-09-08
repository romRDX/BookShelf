import { combineReducers } from 'redux';

import books from './books';
import comments from './comments';

export default combineReducers({
  books,
  comments,
});
