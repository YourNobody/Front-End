import React, { FC, FormEvent, MutableRefObject, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthorizationProps } from './Authorization.props';
import { withAuthLayout } from '../..//layouts/AuthLayout/AuthLayout';
import styles from './Authorization.module.css';
import { HTag, Input, Button } from '../../components';
import { routes } from '../../constants/routes';
import { Link, NavLink, Route } from 'react-router-dom';
import { useRequest } from '../../hooks/request.hook';

const Login: FC<AuthorizationProps> = () => {
  const { loading, error, request, clearError } = useRequest();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    request('/auth/login', 'POST', data, {});
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
          <a href="#">No account?</a>
          <NavLink to={routes.AUTH.REGISTER}>Forgot password?</NavLink>
        </div>
      </form>
    </div>
  );
};

const Register: FC<AuthorizationProps> = () => {
  const { loading, error, request, clearError } = useRequest();
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