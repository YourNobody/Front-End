import { useActions } from "../hooks/useActions.hook";
import { FC } from 'react';
import { Route, Switch, useHistory } from "react-router-dom";
import { Home, Quizes, Profile, Authorization, Page404, Create, Quiz } from '..//pages/pages';
import { routes } from "../constants/routes";
import { useTypedSelector } from './../hooks/useTypedSelector.hook';
import { useEffect } from 'react';
import { LOCALSTORAGE_USER_DATA_NAME, statuses } from './../constants/app';
import { IUserWithToken } from "../interfaces/user.interface";
import {Card} from "@Components";

const buildBaseRoutes = (): JSX.Element => (
  <Switch>
    <Route path={routes.HOME} exact>
    <Home title="Home" />
    </Route>
    <Route path={routes.QUIZZES.ROOT + '/:qType/:orderNumber/:title'} exact>
      <Quiz title="Quiz" />
    </Route>
    <Route path={routes.QUIZZES.ROOT}>
      <Quizes title="Quizes" />
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
      <Quizes title="Quizes" />
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

  useEffect(() => {
    checkUserAuth();
  }, []);

  const { accessToken: isAuthenticated } = useTypedSelector(state => state.user);

  if (isAuthenticated) {
    return buildAllRoutes();
  }

  return buildBaseRoutes();
};