import React from 'react';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import { withMainLayout } from '../../layouts/MainLayout/MainLayout';
import { HTag, Button } from '../../components';
import { HomeProps } from './Home.props';
import styles from './Home.module.css';
import { routes } from '../../constants/routes';

const Home = (props: HomeProps): JSX.Element => {
  const history: RouteComponentProps['history'] = useHistory<RouteComponentProps>();

  const clickRedirectHandler = (route: string): void => {
    history.push(route);
  };

  return (
    <div {...props} className={styles.home}>
      <HTag size="large" className={styles.appTitle}>Hi, you're on <span className={styles.appName}>Quiz App</span></HTag>
      <div className={styles.description}>
        Here you сan post questions on a variety of topics and see the answers to them.<br />
        If something interests you, but you don't want to give opportunity to the question creater see you name or profile image, you can answer as a anonymous.<br />
        Also you can create anonymous questions!
      </div>
      <div className={styles.actions}>
          <Button onClick={clickRedirectHandler.bind(null, routes.AUTH)}>
            Log In
          </Button>
          <Button onClick={clickRedirectHandler.bind(null, routes.QUIZES.ROOT)}>
            To Questions!          
          </Button>
      </div>
    </div>
  );
};

export default withMainLayout(Home);