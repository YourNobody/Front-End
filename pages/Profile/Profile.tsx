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

export const Profile: FC<ProfileProps> = (props) => {
  const history = useHistory();
  const { user } = useTypedSelector(state => state.user);
  const { stripeToken } = useTypedSelector(state => state.app);
  const { userLogOut, openModal, closeModal } = useActions();

  const handleLogOut = async (): Promise<void> => {
    userLogOut();
    closeModal();
    history.push(routes.HOME);
  };

  const handleOpenModal = () => {
    const ModalLogOut = <>
      <HTag size="m" className={styles.modalTitle}>Do you really want to log out?</HTag>
      <div className={styles.modalActions}>
        <Button color="ghost" onClick={closeModal}>No</Button>
        <Button color="danger" onClick={handleLogOut}>Log Out</Button>
      </div>
    </>;
    openModal(ModalLogOut);
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