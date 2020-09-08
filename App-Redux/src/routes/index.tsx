import React from 'react';
import { Switch } from 'react-router-dom';

import { Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import BookDetails from '../pages/BookDetails';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/test" exact component={SignIn} />
    <Route path="/" component={Dashboard} />
    <Route path="/book-details" component={BookDetails} />
  </Switch>
);

export default Routes;
