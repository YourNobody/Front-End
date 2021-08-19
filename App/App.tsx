import React from "react";
import './App.module.css';

import {
  BrowserRouter as Router,
  Switch, Link, Route
} from 'react-router-dom';

import { Home, Quizes, Profile, Authorization, Page404 } from '..//pages/pages';

function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Authorization title="Authorization" />
        </Route>
        <Route path="/quizes">
          <Quizes title="Quizes" />
        </Route>
        <Route path="/profile">
          <Profile title="Profile" />
        </Route>
        <Route path="/auth">
          <Authorization title="Authorization" />
        </Route>
        <Route>
          <Page404 title="No Page" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;