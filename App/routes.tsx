import { useActions } from "../hooks/useActions.hook";
import { FC, useState } from 'react'
import { Route, Switch, useHistory } from "react-router-dom";
import { Home, Quizes, Profile, Authorization, Page404, Create, Quiz } from '..//pages/pages';
import { routes } from "../constants/routes";
import { useTypedSelector } from './../hooks/useTypedSelector.hook';
import { useEffect } from 'react';
import { LOCALSTORAGE_ACCESS_TOKEN_NAME } from '@Constants'

const buildBaseRoutes = (): JSX.Element => (
  <Switch>
    <Route path={routes.HOME} exact>
    <Home title="Home" />
    </Route>
    <Route path={routes.QUIZZES.ROOT + '/:qType/:orderNumber/:title'} exact>
      <Quiz title="Quiz" />
    </Route>
    <Route path={routes.QUIZZES.ROOT}>
      <Quizes title="Quizzes" />
    </Route>
    <Route path={routes.AUTH.ROOT}>
      <Authorization title="Authorization" />
    </Route>
    <Route>
      <Page404 title="No Page" />
    </Route>
  </Switch>
);

const buildAllRoutes = (): JSX.Element => (
  <Switch>
    <Route path={routes.HOME} exact>
      <Home title="Home" />
    </Route>
    <Route path={routes.QUIZZES.ROOT + '/:qType/create'} exact>
      <Create title="Create Question" />
    </Route>
    <Route path={routes.QUIZZES.ROOT + '/:qType/:orderNumber/:title'} exact>
      <Quiz title="Quiz" />
    </Route>
    <Route path={routes.QUIZZES.ROOT}>
      <Quizes title="Quizzes" />
    </Route>
    <Route path={routes.PROFILE.ROOT}>
      <Profile title="Profile" />
    </Route>
    <Route path={routes.AUTH.ROOT}>
      <Authorization title="Authorization" />
    </Route>
    <Route>
      <Page404 title="No Page" />
    </Route>
  </Switch>
);

export const Routes: FC<any> = () => {
  const { checkUserAuth } = useActions();
  const history = useHistory();
  const { accessToken, isAuthChecked } = useTypedSelector(state => state.user);

  useEffect(() => {
    if (!isAuthChecked) checkUserAuth();
  }, [accessToken]);
  
  if (accessToken) {
    history.location.pathname.indexOf(routes.AUTH.ROOT) !== -1 && history.push(routes.HOME);
    return buildAllRoutes();
  }

  return buildBaseRoutes();
}