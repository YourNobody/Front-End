import React, { FC } from 'react';
import {Link} from 'react-router-dom';
import {withMainLayout} from '../../layouts/MainLayout/MainLayout';
import {Button, Card, HTag, Input} from '../../components';
import {HomeProps} from './Home.props';
import styles from './Home.module.css';
import {routes} from '../../constants/routes';
import {useTypedSelector} from '../../hooks/useTypedSelector.hook';

const Home: FC<HomeProps> = (props) => {
  const isAuthenticated = useTypedSelector(state => state.user.accessToken);

  return (
    <div {...props} className={styles.home}>
      <Card>
        <HTag size="large" className={styles.appTitle}>Hi, you're on <span className={styles.appName}>Quiz App</span></HTag>
        <div className={styles.description}>
          Here you сan post questions on a variety of topics and see the answers to them.<br />
          If something interests you, but you don't want to give opportunity to the question creater see you name or profile image, you can answer as a anonymous.<br />
          Also you can create anonymous questions!
        </div>
        <div className={styles.actions}>
          {!isAuthenticated && <Link to={routes.AUTH.LOGIN}>
            <Button>Log In</Button>
          </Link>
          }
          <Link to={routes.QUIZZES.ROOT}>
            <Button>To Quizes!</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default withMainLayout(Home);