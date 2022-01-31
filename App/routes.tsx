import { useActions } from "../hooks/useActions.hook";
import { FC } from 'react';
import { Route, Switch, useHistory } from "react-router-dom";
import { Home, Quizes, Profile, Authorization, Page404, Create, Quiz } from '..//pages/pages';
import { routes } from "../constants/routes";
import { useTypedSelector } from './../hooks/useTypedSelector.hook';
import { useEffect } from 'react';
import { LOCALSTORAGE_USER_DATA_NAME, statuses } from './../constants/app';
import { IUserWithToken } from "../interfaces/user.interface";
import { useRequest } from "../hooks/useRequest";

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
  const { request, loading, error, clearError } = useRequest();
  const history = useHistory();

  // const checkForAuthed = async (): Promise<void> => {
  //   try {
  //     if (localStorage.getItem(LOCALSTORAGE_USER_DATA_NAME)) {
  //       const data: IUserWithToken = JSON.parse(localStorage.getItem(LOCALSTORAGE_USER_DATA_NAME));
  //       const { isAuthenticated: isAuthed } = await request<{ isAuthenticated: boolean }>('/auth/check', 'POST', { token: data.token }, {});
  //
  //       if (!isAuthed) {
  //         userLogOut();
  //       } else {
  //         const expirationData = JSON.parse(atob(data.token.split('.')[1]));
  //         const { expiresIn, expiresAt } = expirationData;
  //         const minutesBeforeExpiration = new Date(expiresIn).getMinutes();
  //         const now = Date.now();
  //         const diff = expiresAt - now;
  //         if (diff < 0) {
  //           setAppAlert('Your session has expired', statuses.WARNING, false);
  //           userLogOut();
  //         }
  //       }
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     userLogOut();
  //   }
  // };

  // useEffect(() => {
  //   checkForAuthed();
  // }, []);

  const isAuthenticated = useTypedSelector(state => state.user.isAuthenticated);

  if (isAuthenticated) {
    return buildAllRoutes();
  }

  return buildBaseRoutes();
};