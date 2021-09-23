import { useActions } from "../hooks/useActions.hook";
import { FC } from 'react';
import { Route, Switch } from "react-router-dom";
import { Home, Quizes, Profile, Authorization, Page404, Create, Quiz } from '..//pages/pages';
import { routes } from "../constants/routes";
import { useTypedSelector } from './../hooks/useTypedSelector.hook';
import { useEffect } from 'react';
import { LOCALSTORAGE_USER_DATA_NAME, statuses } from './../constants/app';

const buildBaseRoutes = (): JSX.Element => (
  <Switch>
    <Route path={routes.HOME} exact>
    <Home title="Home" />
    </Route>
    <Route path={routes.QUIZES.ROOT + '/:qType' + '/:title'} exact>
      <Quiz title="Quiz" />
    </Route>
    <Route path={routes.QUIZES.ROOT}>
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
    <Route path={routes.QUIZES.ROOT + '/:qType' + '/:title'} exact>
      <Quiz title="Quiz" />
    </Route>
    <Route path={routes.QUIZES.CREATE} exact>
      <Create title="Create Question" />
    </Route>
    <Route path={routes.QUIZES.ROOT}>
      <Quizes title="Quizes" />
    </Route>
    <Route path={routes.PROFILE.ACCOUNT}>
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
  const { userLogOut, setAppAlert } = useActions();
  if (localStorage.getItem(LOCALSTORAGE_USER_DATA_NAME)) {
    try {
      const data = JSON.parse(localStorage.getItem(LOCALSTORAGE_USER_DATA_NAME));
      const expirationData = JSON.parse(atob(data.token.split('.')[1]));
      const { expiresIn, expiresAt } = expirationData;
      const minutesBeforeExpiration = new Date(expiresIn).getMinutes();
      const now = Date.now();
      const diff = expiresAt - now;
      // if (minutesBeforeExpiration > 5) {
      //   setTimeout(() => {
      //     setAppAlert('Your session expires in 5 minutes', statuses.WARNING);
      //   }, minutesBeforeExpiration - 5);
      // }

      // if (diff > 0) {
      //   setTimeout(() => {
      //     setAppAlert('Your session has expired', statuses.WARNING);
      //     userLogOut();
      //   }, diff);
      // }

      if (diff < 0) {
        setAppAlert('Your session has expired', statuses.WARNING);
        userLogOut();
      }
    } catch (error) {
      userLogOut();
    }
  }

  const isAuthenticated = useTypedSelector(state => state.user.isAuthenticated);

  if (isAuthenticated) {
    return buildAllRoutes();
  }

  return buildBaseRoutes();
};