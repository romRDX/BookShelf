import { createStore } from 'redux';

import rootReducer from './ducks/rootReducer';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;


// import { createStore, applyMiddleware, Store } from 'redux';
// import createSagaMiddleware from 'redux-saga';
// import { RepositoriesState } from './ducks/repositories/types';

// import rootReducer from './ducks/rootReducer';
// import rootSaga from './ducks/rootSaga';

// export interface ApplicationState {
//   repositories: RepositoriesState
// }

// const sagaMiddleware = createSagaMiddleware();

// const store: Store<ApplicationState> = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// sagaMiddleware.run(rootSaga);

// export default store;
