import React, { FC, FormEvent, MutableRefObject, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthorizationProps } from './Authorization.props';
import { withAuthLayout } from '../..//layouts/AuthLayout/AuthLayout';
import styles from './Authorization.module.css';
import { HTag, Input, Button } from '../../components';
import { routes } from '../../constants/routes';
import { Link, Route, Switch } from 'react-router-dom';
import { useRequest } from '../../hooks/request.hook';

const Login: FC<AuthorizationProps> = () => {
  const { loading, error, request, clearError } = useRequest();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    request('login', 'POST', data, {});
  };
  
  return (
    <div className={styles.authorization}>
      <HTag size="large" className={styles.naming}>Quiz App</HTag>
      <form className={styles.form} action="post" onSubmit={handleSubmit(onSubmit)}>
        <HTag size="large" className={styles.title}>Log In</HTag>
        <div className={styles.inputBlock}>
            <Input type="email" name="email" label="Email" {...register('email')}/>
        </div>
        <div className={styles.inputBlock}>
            <Input type="password" name="password" label="Password" {...register('password')}/>
        </div>
        <Button className={styles.button}>Log In</Button>
        <div className={styles.info}>
          <Link to={routes.AUTH.REGISTER}>No account?</Link>
          <Link to={routes.AUTH.REGISTER}>Forgot password?</Link>
        </div>
      </form>
    </div>
  );
};

const Register: FC<AuthorizationProps> = () => {
  console.log('HERE')
  const { loading, error, request, clearError } = useRequest();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    request('register', 'POST', data, {});
  };
  return (
    <div className={styles.authorization}>
      <HTag size="large" className={styles.naming}>Quiz App</HTag>
      <form className={styles.form} action="post" onSubmit={handleSubmit(onSubmit)}>
        <HTag size="large" className={styles.title}>Registration</HTag>
        <div className={styles.inputBlock}>
          <Input type="email" label="Email" {...register('email')}/>
        </div>
        <div className={styles.inputBlock}>
          <Input type="password" label="Password" {...register('password')}/>
        </div>
        <div className={styles.inputBlock}>
          <Input type="password" label="Confirm Password" {...register('confirm')}/>
        </div>
        <Button className={styles.button}>Register</Button>
      </form>
    </div>
  );
};

export const Authorization: FC<AuthorizationProps> = (props): JSX.Element => {
  return (
    <Switch>
      <Route path={routes.AUTH.ROOT} exact>
        <Login {...props}/>
      </Route>
      <Route path={routes.AUTH.LOGIN}>
        <Login {...props}/>
      </Route>
      <Route path={routes.AUTH.REGISTER} exact>
        <Register {...props}/>
      </Route>
    </Switch>
  );
};

export default withAuthLayout(Authorization);