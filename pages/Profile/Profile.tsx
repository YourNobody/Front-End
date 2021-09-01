import React, { useEffect, useState } from 'react';
import { ProfileProps } from './Profile.props';
import styles from './Profile.module.css';
import { withMainLayout } from '../../layouts/MainLayout/MainLayout';
import { Link, Route, useHistory } from 'react-router-dom';
import { routes } from '../../constants/routes';
import { AccountInfo } from './AccountInfo/AccountInfo';
import { useTypedSelector } from '../../hooks/useTypedSelector.hook';
import { useActions } from '../../hooks/useActions.hook';
import { useRequest } from '../../hooks/useRequest';
import { statuses } from '../../constants/app';

export const Profile = (props: ProfileProps): JSX.Element => {
  const history = useHistory();
  const { user } = useTypedSelector(state => state.user);
  const { userLogOut, setAppAlert } = useActions();
  const { error, clearError, request, data, clearData } = useRequest();
  console.log('profile');
  

  const handleLogOut = async (): Promise<void> => {
    request('logout', 'POST');
    userLogOut();
  };

  useEffect(() => {
    if (error) {
      setAppAlert(error, statuses.ERROR);
      clearError();
    }
    if (data) {
      setAppAlert(data.message, statuses.SUCCESS);
      clearData();
      history.push(routes.HOME);
    }
  }, [error, data]);

  return (
    <div {...props} className={styles.profile}>
      <ul className={styles.navList}>
        <Link to={routes.HOME}>
          <li>Account</li>
        </Link>
        <Link to={routes.PROFILE + '/questions'}>
          <li>My Questions</li>
        </Link>
        <a>
          <li onClick={handleLogOut}>Log Out</li>
        </a>
      </ul>
      <Route path={routes.HOME}>
        <AccountInfo firstName={user.firstName} lastName={user.lastName} email={user.email} />
      </Route>
    </div>
  );
};

export default withMainLayout(Profile);