import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { AuthorizationProps } from './Authorization.props';
import { withAuthLayout } from '../..//layouts/AuthLayout/AuthLayout';
import styles from './Authorization.module.css';
import { HTag, Input, Button } from '../../components';
import { routes } from '../../constants/routes';
import { Link, Route, Switch } from 'react-router-dom';
import { useActions } from '../../hooks/useActions.hook';
import { IUserReducer } from '../../store/reducers.interface';import { useRequest } from '../../hooks/useRequest';
;

const Login: FC<AuthorizationProps> = () => {
  const { register, handleSubmit, reset } = useForm();
  const { fetchUserBegging, fetchUserSuccess, fetchUserError } = useActions();

  const onSubmit = async (data) => {
    try {
      fetchUserBegging();
      const user = await useRequest<IUserReducer>('login', 'POST', data, {});
      fetchUserSuccess(user.data);
    } catch (e) {
      fetchUserError(e);
    }
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
  const { register, handleSubmit } = useForm();
  return (
    <div className={styles.authorization}>
      <HTag size="large" className={styles.naming}>Quiz App</HTag>
      <form className={styles.form} action="post">
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