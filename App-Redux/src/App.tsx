import React from 'react';

import { Provider } from 'react-redux';
import store from './store';

import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

import GlobalStyle from './styles/global';

import * as categoryStore from './services/categoryStore';

// Creating categories in local storage
categoryStore.post();

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <Provider store={store}>
        <Routes />
      </Provider>
      <GlobalStyle />
    </BrowserRouter>
  </>
);

export default App;
