import React from 'react';
import { Switch } from 'react-router-dom';

import { Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import CategoryWantToRead from '../pages/CategoryWantToRead';
import CategoryRead from '../pages/CategoryRead';
import CategoryCurrentlyReading from '../pages/CategoryCurrentlyReading';
import BookDetails from '../pages/BookDetails';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/want-to-read-books" component={CategoryWantToRead} />
    <Route path="/currently-reading-books" component={CategoryCurrentlyReading} />
    <Route path="/read-books" component={CategoryRead} />
    <Route path="/book-details" component={BookDetails} />
  </Switch>
);

export default Routes;
