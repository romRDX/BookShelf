import { combineReducers } from 'redux';

import books from './books/index';
import comments from './comments/index';

export default combineReducers({
  books,
  comments,
});
