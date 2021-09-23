import { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AuthorizationProps } from './Authorization.props';
import { withAuthLayout } from '../..//layouts/AuthLayout/AuthLayout';
import styles from './Authorization.module.css';
import { HTag, Input, Button } from '../../components';
import { routes } from '../../constants/routes';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import { useActions } from '../../hooks/useActions.hook';
import { useRequest } from '../../hooks/useRequest';
import { statuses } from '../../constants/app';
import { getEmptyObject } from '../../helpers/custom.helper';

const Login: FC<AuthorizationProps> = () => {
  const { register, handleSubmit, reset } = useForm();
  const { fetchUserBegining, setAppAlert, fetchUserError, fetchUserSuccess } = useActions();
  const { error, clearError, request, loading } = useRequest();
  const history = useHistory();

  const onSubmit = async (formData) => {
    try {
      fetchUserBegining();
      const data: any = await request('login', 'POST', formData);
      console.log('data: ', data);
      
      setAppAlert(data.message, statuses.SUCCESS);
      fetchUserSuccess({ user: data.user, token: data.token });
      history.push(routes.HOME);
    } catch (err) {
      setAppAlert(error, statuses.ERROR);
      fetchUserError();
      clearError();
    }
    reset(getEmptyObject(formData));
  };
  
  return (
    <div className={styles.authorization}>
      <HTag size="large" className={styles.naming}>Quiz App</HTag>
      <form className={styles.form} action="post" onSubmit={handleSubmit(onSubmit)}>
        <HTag size="large" className={styles.title}>Log In</HTag>
        <div className={styles.inputBlock}>
          <Input type="email" label="Email" name="email" {...register('email', {
            required: true,
            disabled: loading
          })}/>
        </div>
        <div className={styles.inputBlock}>
          <Input type="password" name="password" label="Password" {...register('password', {
            required: true,
            minLength: 6,
            maxLength: 18,
            disabled: loading
          })}/>
        </div>
        <Button className={styles.button} type="submit">Log In</Button>
        <div className={styles.info}>
          <Link to={routes.AUTH.REGISTER}>No account?</Link>
          <Link to={routes.AUTH.REGISTER}>Forgot password?</Link>
        </div>
      </form>
    </div>
  );
};

const Register: FC<AuthorizationProps> = () => {
  const { register, handleSubmit, reset } = useForm();
  const { fetchUserBegining, setAppAlert, fetchUserError, fetchUserSuccess } = useActions();
  const { error, clearError, request, loading } = useRequest();
  const history = useHistory();

  const onSubmit = async (formData) => {
    console.log(formData);
    
    try {
      fetchUserBegining();
      const data: any = await request('register', 'POST', formData);
      history.push(routes.AUTH.LOGIN);
      setAppAlert(data.message, statuses.SUCCESS);
      fetchUserSuccess(data.user);
    } catch (err) {
      setAppAlert(error, statuses.ERROR);
      fetchUserError();
      clearError();
    }
    reset(getEmptyObject(formData));
  };

  return (
    <div className={styles.authorization}>
      <HTag size="large" className={styles.naming}>Quiz App</HTag>
      <form className={styles.form} action="post" onSubmit={handleSubmit(onSubmit)}>
        <HTag size="large" className={styles.title}>Sign Up</HTag>
        <div className={styles.inputBlock}>
          <Input type="text" label="Nickname" name="nickname" {...register('nickname', {
            required: true,
            minLength: 4,
            maxLength: 16,
            // pattern: '/^[a-zA-Z][a-zA-Z\s]{1,16}$/',
            // onInvalid: (e: any) => e.target.setCustomValidity('Only latin letters and spaces are acceptable'),
            disabled: loading
          })}/>
        </div>
        <div className={styles.inputBlock}>
          <Input type="email" label="Email" name="email" {...register('email', {
            required: true,
            disabled: loading
          })}/>
        </div>
        <div className={styles.inputBlock}>
          <Input type="password" label="Password" {...register('password', {
            required: true,
            minLength: 6,
            maxLength: 18,
            disabled: loading
          })}/>
        </div>
        <div className={styles.inputBlock}>
          <Input type="password" label="Confirm Password" {...register('confirm', {
            required: true,
            minLength: 6,
            maxLength: 18,
            disabled: loading
          })}/>
        </div>
        <Button className={styles.button} type="submit">Sign Up</Button>
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