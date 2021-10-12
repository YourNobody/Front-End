import React, { FC, useEffect, useState } from 'react';
import { ProfileProps } from './Profile.props';
import styles from './Profile.module.css';
import { withMainLayout } from '../../layouts/MainLayout/MainLayout';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import { routes } from '../../constants/routes';
import { AccountInfo } from './AccountInfo/AccountInfo';
import { useTypedSelector } from '../../hooks/useTypedSelector.hook';
import { useActions } from '../../hooks/useActions.hook';
import { useRequest } from '../../hooks/useRequest';
import { statuses } from '../../constants/app';
import { HTag, Button } from '../../components';
import { QuizStats } from './QuizStats/QuizStats';
import { WithMessage } from '../../interfaces/quizes.interface';

export const Profile: FC<ProfileProps> = (props) => {
  const history = useHistory();
  const { user } = useTypedSelector(state => state.user);
  const { userLogOut, setAppAlert, openModal, closeModal } = useActions();
  const { error, clearError, request, loading } = useRequest();

  const handleLogOut = async (): Promise<void> => {
    try {
      const data: WithMessage = await request('/auth/logout', 'POST');
      setAppAlert(data.message, statuses.SUCCESS);
      userLogOut();
      closeModal();
      history.push(routes.HOME);
    } catch (err) {
      console.error(err);
      setAppAlert(error, statuses.ERROR);
      clearError();
    }
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
          <li>My Quizes</li>
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
      </Switch>
    </div>
  );
};

export default withMainLayout(Profile);