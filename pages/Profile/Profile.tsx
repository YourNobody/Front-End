import React from 'react';
import { ProfileProps } from './Profile.props';
import styles from './Profile.module.css';
import { withMainLayout } from '../../layouts/MainLayout/MainLayout';
import { Link, Route } from 'react-router-dom';
import { routes } from '../../constants/routes';
import { AccountInfo } from './AccountInfo/AccountInfo';

export const Profile = (props: ProfileProps): JSX.Element => {
  return (
    <div {...props} className={styles.profile}>
      <ul className={styles.navList}>
        <Link to={routes.HOME}>
          <li>Account</li>
        </Link>
        <Link to={routes.PROFILE + '/questions'}>
          <li>My Questions</li>
        </Link>
        <Link to={routes.PROFILE + '/logout'}>
          <li>Log Out</li>
        </Link>
      </ul>
      <Route path={routes.HOME}>
        <AccountInfo userName="Pavel" email="p@mail.ru" />
      </Route>
      <Route path={routes.PROFILE + '/questions'}>
        questions
      </Route>
    </div>
  );
};

export default withMainLayout(Profile);