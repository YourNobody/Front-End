import React from "react";
import './App.module.css';

import {
  BrowserRouter as Router,
  Switch, Link, Route
} from 'react-router-dom';

import { Home, Quizes, Profile, Authorization, Page404 } from '..//pages/pages';
import { routes } from "../constants/routes";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { Alerter } from "../components/Alerter/Alerter";

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Alerter />
      <Router>
        <Switch>
          <Route path={routes.HOME} exact>
            <Home title="Home" />
          </Route>
          <Route path={routes.QUIZES.ROOT}>
            <Quizes title="Quizes" />
          </Route>
          <Route path={routes.PROFILE + '/account'}>
            <Profile title="Profile" />
          </Route>
          <Route path={routes.AUTH.ROOT}>
            <Authorization title="Authorization" />
          </Route>
          <Route>
            <Page404 title="No Page" />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;