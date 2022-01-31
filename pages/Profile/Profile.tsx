import React, { FC, useEffect, useState } from 'react';
import { ProfileProps } from './Profile.props';
import styles from './Profile.module.css';
import { withMainLayout } from '../../layouts/MainLayout/MainLayout';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import { routes } from '../../constants/routes';
import { AccountInfo } from './AccountInfo/AccountInfo';
import { useTypedSelector } from '../../hooks/useTypedSelector.hook';
import { useActions } from '../../hooks/useActions.hook';
import { HTag, Button } from '../../components';
import { QuizStats } from './QuizStats/QuizStats';
import { Subscription } from './Subscription/Subscription';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'
import {Change} from "./Change/Change";

export const Profile: FC<ProfileProps> = (props) => {
  const history = useHistory();
  const { user } = useTypedSelector(state => state.user);
  const { stripeToken } = useTypedSelector(state => state.app);
  const { userLogOut, openModal, closeModal } = useActions();

  const handleLogOut = () => {
    userLogOut(() => history.push(routes.HOME));
    closeModal();
  };

  const handleOpenModal = () => {
    openModal({
      actionFunc: handleLogOut,
      actionButtonName: 'Log Out',
      closeButtonName: 'Stay on page',
      modalQuestion: 'Do you really want to log out?'
    });
  };

  return (
    <div {...props} className={styles.profile}>
      <ul className={styles.navList}>
        <Link to={routes.PROFILE.ACCOUNT}>
          <li>Account</li>
        </Link>
        <Link to={routes.PROFILE.QUESTIONS}>
          <li>My Quizzes</li>
        </Link>
        <Link to={routes.PROFILE.SUBSCRIPTION}>
          <li>Subscription</li>
        </Link>
        <a>
          <li onClick={handleOpenModal}>Log Out</li>
        </a>
      </ul>
      <Switch>
        <Route path={routes.PROFILE.ACCOUNT} exact>
          <AccountInfo nickname={user?.nickname} email={user?.email} />
        </Route>
        <Route path={routes.PROFILE.ACCOUNT_CHANGE_NAME} exact>
          <Change changeOption="name" />
        </Route>
        <Route path={routes.PROFILE.ACCOUNT_CHANGE_EMAIL} exact>
          <Change changeOption="email" />
        </Route>
        <Route path={routes.PROFILE.ACCOUNT_CHANGE_PASSWORD} exact>
          <Change changeOption="password" />
        </Route>
        <Route path={routes.PROFILE.QUESTIONS} exact>
          <QuizStats/>
        </Route>
        <Route path={routes.PROFILE.SUBSCRIPTION} exact>
          <Elements stripe={loadStripe(stripeToken)}>
            <Subscription/>
          </Elements>
        </Route>
      </Switch>
    </div>
  );
};

export default withMainLayout(Profile);