import { FC, useEffect, useState } from 'react';
import { Controller, Resolver, useForm } from 'react-hook-form';
import { AuthorizationProps } from './Authorization.props';
import { withAuthLayout } from '../..//layouts/AuthLayout/AuthLayout';
import styles from './Authorization.module.css';
import { HTag, Input, Button } from '../../components';
import { routes } from '../../constants/routes';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import { useActions } from '../../hooks/useActions.hook';
import { useRequest } from '../../hooks/useRequest';
import { statuses } from '../../constants/app';
import { getEmptyObject, getObjectWithDefinedKeys } from '../../helpers/custom.helper';
import { useResolver } from '../../hooks/useResolver.hook';
import { WithMessage } from '../../interfaces/quizes.interface';
import { IUserWithToken, WithQuizes } from '../../interfaces/user.interface';

const Login: FC<AuthorizationProps> = () => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const { initial, resolver } = useResolver().User;
  const { register, getValues, handleSubmit, reset, formState: { errors } } = useForm({ 
    resolver,
    context: { isValid }
  });
  const { setAppAlert, fetchUserError, fetchUserSuccess } = useActions();
  const { error, clearError, request, loading } = useRequest();
  const history = useHistory();

  const onSubmit = async (formData) => {
    try {
      const data = await request<IUserWithToken & WithMessage & WithQuizes>('/auth/login', 'POST', formData);
      setAppAlert(data.message, statuses.SUCCESS);
      fetchUserSuccess({ user: data.user, token: data.token });
      history.push(routes.HOME);
    } catch (err: any) {
      setAppAlert(err.message, statuses.ERROR);
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
          <Input type="text"
            label="Email"
            name="email"
            error={errors['email']?.message}
            {...register('email', {
              disabled: loading
            })}
          />
        </div>
        <div className={styles.inputBlock}>
          <Input
            type="password"
            name="password"
            label="Password"
            error={errors['password']?.message}
            {...register('password', {
              disabled: loading
            })}
          />
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
  const [isValid, setIsValid] = useState<boolean>(true);
  const { initial, resolver } = useResolver().User;
  const { register, handleSubmit, reset, formState: { errors } } = useForm<typeof initial>({
    resolver,
    context: { isValid }
  });
  const { setAppAlert } = useActions(); 
  const { error, clearError, request, loading } = useRequest();
  const history = useHistory();
  
  const onSubmit = async (formData) => {
    console.log('here');
    
    if (Object.keys(errors).length) {
      console.log('regected');
      return;
    }
    if (formData.password !== formData.confirm) return setAppAlert('Password wasn\'t confirmed', statuses.ERROR);
    try {
      const data: WithMessage = await request('/auth/register', 'POST', formData);
      console.log('data: ', data);
      
      history.push(routes.AUTH.LOGIN);
      setAppAlert(data.message, statuses.SUCCESS);
    } catch (err) {
      setAppAlert(err, statuses.ERROR);
      clearError();
    }
    reset(getEmptyObject(formData));
  };

  return (
    <div className={styles.authorization}>
      <HTag size="large" className={styles.naming}>Quiz App</HTag>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <HTag size="large" className={styles.title}>Sign Up</HTag>
        <div className={styles.inputBlock}>
          <Input type="text"
            label="Nickname"
            name="nickname"
            error={errors['nickname']?.message}
            {...register('nickname', {
              disabled: loading,
            })}
          />
        </div>
        <div className={styles.inputBlock}>
          <Input
            type="text"
            label="Email"
            name="email"
            error={errors['email']?.message}
            {...register('email', {
              disabled: loading
            })}
          />
        </div>
        <div className={styles.inputBlock}>
          <Input
            type="password"
            label="Password"
            error={errors['password']?.message}
            {...register('password', {
              disabled: loading
            })}
          />
        </div>
        <div className={styles.inputBlock}>
          <Input
            type="password"
            label="Confirm Password"
            error={errors['confirm']?.message}
            {...register('confirm', {
            disabled: loading
          })}/>
        </div>
        <Button className={styles.button} type="submit">Sign Up</Button>
        <div className={styles.info}>
          <Link to={routes.AUTH.LOGIN}>Back to login</Link>
        </div>
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