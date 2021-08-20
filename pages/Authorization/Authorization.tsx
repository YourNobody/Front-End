import React from 'react';
import { AuthorizationProps } from './Authorization.props';
import { withAuthLayout } from '../..//layouts/AuthLayout/AuthLayout';
import styles from './Authorization.module.css';
import { HTag, Input, Button } from '../../components';

export const Authorization = (props: AuthorizationProps): JSX.Element => {
  return (
    <div className={styles.authorization}>
      <HTag size="large" className={styles.naming}>Quiz App</HTag>
      <form className={styles.form} action="">
        <HTag size="large" className={styles.title}>Authorization</HTag>
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

export default withAuthLayout(Authorization);