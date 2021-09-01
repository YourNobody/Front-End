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
import { getEmptyObject } from '../../helpers/clear.helper';

const Login: FC<AuthorizationProps> = () => {
  const { register, handleSubmit, reset } = useForm();
  const { fetchUserBegging, setAppAlert, fetchUserError, fetchUserSuccess } = useActions();
  const { error, clearError, request, data, clearData } = useRequest();
  const history = useHistory();
  
  useEffect(() => {
    if (error) {
      setAppAlert(error, statuses.ERROR);
      fetchUserError();
      clearError();
    }
    if (data) {
      setAppAlert(data.messsage, statuses.SUCCESS);
      fetchUserSuccess(data);
      clearData();
      history.push(routes.HOME);
    }
  }, [error, data]);

  const onSubmit = (formData) => {
    fetchUserBegging();
    request('login', 'POST', formData);
    reset(getEmptyObject(formData));
  };
  
  return (
    <div className={styles.authorization}>
      <HTag size="large" className={styles.naming}>Quiz App</HTag>
      <form className={styles.form} action="post" onSubmit={handleSubmit(onSubmit)}>
        <HTag size="large" className={styles.title}>Log In</HTag>
        <div className={styles.inputBlock}>
          <Input type="email" label="Email" name="email" {...register('email')}/>
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
  const { register, handleSubmit, setValue, reset } = useForm();
  const { fetchUserBegging, setAppAlert, fetchUserError, fetchUserSuccess } = useActions();
  const { error, clearError, request, data, clearData } = useRequest();
  const history = useHistory();

  useEffect(() => {
    if (error) {
      setAppAlert(error, statuses.ERROR);
      fetchUserError();
      clearError();
    }
    if (data) {
      setAppAlert(data.message, statuses.SUCCESS);
      fetchUserSuccess(data);
      clearData();
      history.push(routes.AUTH.LOGIN);
    }
  }, [error, data]);

  const onSubmit = (formData) => {
    fetchUserBegging();
    request('register', 'POST', formData);
    reset(getEmptyObject(formData));
  };

  return (
    <div className={styles.authorization}>
      <HTag size="large" className={styles.naming}>Quiz App</HTag>
      <form className={styles.form} action="post" onSubmit={handleSubmit(onSubmit)}>
        <HTag size="large" className={styles.title}>Registration</HTag>
        <div className={styles.inputBlock}>
          <Input type="email" label="Email" name="email" {...register('email')}/>
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