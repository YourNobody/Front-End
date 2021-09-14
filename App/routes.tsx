import { useActions } from "../hooks/useActions.hook";
import { useAuth } from "../hooks/useAuth.hooks";
import { FC, PropsWithChildren } from 'react';
import { Route, Switch } from "react-router-dom";
import { Home, Quizes, Profile, Authorization, Page404, Create } from '..//pages/pages';
import { routes } from "../constants/routes";
import { useTypedSelector } from './../hooks/useTypedSelector.hook';

const buildBaseRoutes = (): JSX.Element => (
  <Switch>
    <Route path={routes.HOME} exact>
    <Home title="Home" />
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
  const {token, userId} = useAuth();
  const {userLogIn} = useActions();

  if (token && userId) {
    userLogIn();
  }

  const isAuthenticated = useTypedSelector(state => state.user.isAuthenticated)

  if (isAuthenticated) {
    return buildAllRoutes();
  }

  return buildBaseRoutes();
};