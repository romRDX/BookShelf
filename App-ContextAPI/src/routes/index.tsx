import React from 'react';
import { Switch } from 'react-router-dom';

import { Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';

// Routes for Context API
import Dashboard from '../pages/Dashboard';
import BookDetails from '../pages/BookDetails';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/book-details" component={BookDetails} />
  </Switch>
);

export default Routes;
