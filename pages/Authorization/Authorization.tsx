import { FC, FormEvent, useEffect, useState } from 'react'
import { Controller, Resolver, useForm, UseFormHandleSubmit } from 'react-hook-form';
import { AuthorizationProps } from './Authorization.props';
import { withAuthLayout } from '../..//layouts/AuthLayout/AuthLayout';
import styles from './Authorization.module.css';
import { HTag, Input, Button, Card, HR } from '../../components';
import { routes } from '../../constants/routes';
import { Link, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { useActions } from '../../hooks/useActions.hook';
import { useRequest } from '../../hooks/useRequest';
import { statuses } from '../../constants/app';
import { getEmptyObject } from '../../helpers/custom.helper';
import { IUserResetPassword, IUserWithToken, WithQuizes } from '../../interfaces/user.interface';
import { useInput } from '../../hooks/useInput.hook'
import { useTypedSelector } from '../../hooks/useTypedSelector.hook'

const Login: FC<AuthorizationProps> = () => {
  const { register, handleSubmit, clearValues, formState: { errors } } = useInput();
  const { loading } = useTypedSelector(state => state.user);
  const { userLogin } = useActions();
  const history = useHistory();

  const onSubmit = (formData) => {
    console.log('errors: ', Object.keys(errors).length)
    // if (Object.keys(errors).length) return;
    console.log(formData)
    // userLogin(formData, () => history.push(routes.HOME));
    clearValues('login');
  };
  
  return (
    <div className={styles.authorization}>
      <HTag size="large" className={styles.naming}>Quiz App</HTag>
      <form className={styles.form} action="post" onSubmit={handleSubmit('login', onSubmit)}>
        <HTag size="large" className={styles.title}>Log In</HTag>
        <div className={styles.inputBlock}>
          <Input
            type='text'
            label='Email'
            {...register('login.email')}
            disabled={loading}
          />
        </div>
        <div className={styles.inputBlock}>
          <Input
            type="password"
            label="Password"
            {...register('login.password')}
            disabled={loading}
          />
        </div>
        <Button className={styles.button} type="submit" disabled={loading}>Log In</Button>
        <div className={styles.info}>
          <Link to={routes.AUTH.REGISTER}>No account?</Link>
          <Link to={routes.AUTH.RESET}>Forgot password?</Link>
        </div>
      </form>
    </div>
  );
};

const Register: FC<AuthorizationProps> = () => {
  const { register, handleSubmit, clearValues, formState: { errors } } = useInput();
  const { userRegister, setAppAlert } = useActions();
  const { loading } = useTypedSelector(state => state.user);
  const history = useHistory();

  const onSubmit = async (formData) => {
    if (Object.keys(errors).length) return;
    if (formData.password !== formData.confirm) return setAppAlert('Password wasn\'t confirmed', statuses.ERROR);
    userRegister(formData, () => history.push(routes.AUTH.LOGIN));
    history.push(routes.AUTH.LOGIN);
    clearValues(getEmptyObject(formData));
  };

  return (
    <div className={styles.authorization}>
      <HTag size="large" className={styles.naming}>Quiz App</HTag>
      <form className={styles.form} onSubmit={handleSubmit('register', onSubmit)}>
        <HTag size="large" className={styles.title}>Sign Up</HTag>
        <div className={styles.inputBlock}>
          <Input
            type="text"
            label='Nickname'
            {...register('register.nickname')}
            disabled={loading}
          />
        </div>
        <div className={styles.inputBlock}>
          <Input
            type="text"
            label="Email"
            {...register('register.email')}
            disabled={loading}
          />
        </div>
        <div className={styles.inputBlock}>
          <Input
            type="password"
            label="Password"
            {...register('register.password')}
            disabled={loading}
          />
        </div>
        <div className={styles.inputBlock}>
          <Input
            type='password'
            label='Confirm Password'
            {...register('register.confirm')}
            disabled={loading}
          />
        </div>
        <Button className={styles.button} type="submit" disabled={loading}>Sign Up</Button>
        <div className={styles.info}>
          <Link to={routes.AUTH.LOGIN}>Back to login</Link>
        </div>
      </form>
    </div>
  );
};

const Reset: FC<AuthorizationProps> = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { register, clearValues, handleSubmit, formState: { errors } } = useInput();
  const { setAppAlert, userReset } = useActions();
  const { loading, resetToken } = useTypedSelector(state => state.user);
  const { request } = useRequest();
  const [isSent, setIsSent] = useState<boolean>(loading);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  useEffect(() => {
    const resetToken = pathname.split('/')[pathname.split('/').length - 1]
    if (resetToken && resetToken !== 'reset') {
      const getAccess = async () => {
        try {
          const data = await request<IUserResetPassword>(pathname + '/' + resetToken, 'GET');
          setIsResetting(data.isAccessed);
        } catch (err: any) {
          setIsResetting(false);
          setAppAlert(err.message, statuses.ERROR)
        }
      }
      getAccess();
    }
  }, []);

  const handleEmailSending = async (formData) => {
    userReset(formData);
    !loading && setIsSent(true);
    clearValues(formData);
  };

  const handleReset = async (formData) => {
    if (formData.password !== formData.confirm) throw new Error('Password wasn\'t confirmed');
    userReset(formData, resetToken);
    history.push(routes.AUTH.LOGIN);
  };

  return (
    <div className={styles.authorization}>
      <HTag size="large" className={styles.naming}>Quiz App</HTag>
      {
        !isResetting ?
          isSent
            ? <Card className={styles.text}>
                <HTag size="m">
                  We have sent you the email with a link for password reset
                  <br />
                  Please, follow the link, if you get the message
                  <br />
                  (If you don't see our email, check the spam please)
                </HTag>
                <HR />
                <div className={styles.info}>
                  <Link to={routes.AUTH.LOGIN}>Back to login</Link>
                </div>
            </Card>
            : <form className={styles.form} onSubmit={handleSubmit('reset', handleEmailSending)}>
              <HTag size="large" className={styles.title}>Access Recovery</HTag>
              <div className={styles.inputBlock}>
                <Input
                  type="text"
                  label="Email for recovery process"
                  {...register('reset.email')}
                  disabled={loading}
                />
              </div>
              <Button className={styles.button} type="submit" disabled={loading}>Send email message</Button>
              <div className={styles.info}>
                <Link to={routes.AUTH.LOGIN}>Back to login</Link>
              </div>
            </form>
          : <>
            <form className={styles.form} onSubmit={handleReset}>
              <HTag size="large" className={styles.title}>Access Recovery</HTag>
              <div className={styles.inputBlock}>
                <Input
                  type='password'
                  label='Enter new password'
                  {...register('password')}
                  disabled={loading}
                />
              </div>
              <div className={styles.inputBlock}>
                <Input
                  type='password'
                  label='Confirm new password'
                  {...register('confirm')}
                  disabled={loading}
                />
              </div>
              <Button className={styles.button} type="submit" disabled={loading}>Reset</Button>
              <div className={styles.info}>
                <Link to={routes.AUTH.LOGIN}>Back to login</Link>
              </div>
            </form>
          </>
      }
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
      <Route path={routes.AUTH.RESET} exact>
        <Reset {...props}/>
      </Route>
    </Switch>
  );
};

export default withAuthLayout(Authorization);