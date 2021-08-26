import React, { FC } from 'react';
import { AuthorizationProps } from './Authorization.props';
import { withAuthLayout } from '../..//layouts/AuthLayout/AuthLayout';
import styles from './Authorization.module.css';
import { HTag, Input, Button } from '../../components';
import { routes } from '../../constants/routes';
import { Route } from 'react-router-dom';

const Login: FC<AuthorizationProps> = () => {
  return (
    <div className={styles.authorization}>
      <HTag size="large" className={styles.naming}>Quiz App</HTag>
      <form className={styles.form} action="post">
        <HTag size="large" className={styles.title}>Log In</HTag>
        <div className={styles.inputBlock}>
          <Input type="email" name="email" label="Email"/>
        </div>
        <div className={styles.inputBlock}>
          <Input type="password" name="password" label="Password"/>
        </div>
        <Button className={styles.button}>Log In</Button>
        <div className={styles.info}>
          <a href="#">No account?</a>
          <a href="#">Forgot password?</a>
        </div>
      </form>
    </div>
  );
};

const Register: FC<AuthorizationProps> = () => {
  return (
    <div className={styles.authorization}>
      <HTag size="large" className={styles.naming}>Quiz App</HTag>
      <form className={styles.form} action="post">
        <HTag size="large" className={styles.title}>Registration</HTag>
        <div className={styles.inputBlock}>
          <Input type="email" name="email" label="Email"/>
        </div>
        <div className={styles.inputBlock}>
          <Input type="password" name="password" label="Password"/>
        </div>
        <div className={styles.inputBlock}>
          <Input type="confirm" name="confirm" label="Confirm Password"/>
        </div>
        <Button className={styles.button}>Register</Button>
      </form>
    </div>
  );
};

export const Authorization: FC<AuthorizationProps> = (props): JSX.Element => {
  return (
    <>
    <Route path={routes.AUTH.LOGIN} exact>
      <Login {...props}/>
    </Route>
    <Route path={routes.AUTH.REGISTER} exact>
      <Register {...props}/>
    </Route>
    </>
  );
};

export default withAuthLayout(Authorization);