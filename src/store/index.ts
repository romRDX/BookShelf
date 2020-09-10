import { createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './ducks/rootReducer';
import { BooksState } from './ducks/books/types';
import { CommentsState } from './ducks/comments/types';

export interface ApplicationState {
  books: BooksState;
  comments: CommentsState;
}

const store: Store<ApplicationState> = createStore(
  rootReducer,
  composeWithDevTools(),
);

export default store;
