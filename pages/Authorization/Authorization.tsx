import React, {FC, FormEvent, useEffect, useMemo, useState} from 'react'
import { Controller, Resolver, useForm, UseFormHandleSubmit } from 'react-hook-form';
import { AuthorizationProps } from './Authorization.props';
import { withAuthLayout } from '@Layouts';
import styles from './Authorization.module.scss';
import { HTag, Input, Button, Card, HR } from '@Components';
import { routes } from '@Constants';
import {Link, Route, Switch, useHistory, useLocation, useParams} from 'react-router-dom';
import { useActions } from '../../hooks/useActions.hook';
import { statuses } from '../../constants/app';
import { IUserResetPassword } from '../../interfaces/user.interface';
import { useTypedSelector } from '../../hooks/useTypedSelector.hook';
import {
  addClassValidationResolver,
  User
} from "../../helpers/addValidationResolver.helper";

const UserResolver = addClassValidationResolver<User>(User);

const Login: FC<AuthorizationProps> = () => {
  const { register, handleSubmit, reset, watch, formState: { errors }, getValues} = useForm<User>({ resolver: UserResolver });

  const { loading } = useTypedSelector(state => state.user);
  const { loginUser } = useActions();
  const history = useHistory();

  const onSubmit = (formData) => {
    const loginData = formData
    loginUser(loginData, () => {
      reset();
      history.push(routes.HOME);
    })
  };

  return (
    <div className={styles.authorization}>
      <HTag size="large" className={styles.naming}>Quiz App</HTag>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <HTag size="large" className={styles.title}>Log In</HTag>
        <div className={styles.inputBlock}>
          <Input
            {...register('email')}
            type='email'
            formNoValidate={true}
            label='Email'
            error={errors.email}
            disabled={loading}
          />
        </div>
        <div className={styles.inputBlock}>
          <Input
            {...register('password')}
            type="password"
            label="Password"
            error={errors.password}
            disabled={loading}
          />
        </div>
        <Button className={styles.button} type="submit" disabled={loading}>Log In</Button>
        <div className={styles.info}>
          <Link to={routes.AUTH.REGISTER}>No account?</Link>
          <Link to={routes.AUTH.RESET}>Forgot password?</Link>
        </div>
        <div className={styles.info}>
          <Link to={routes.HOME}>Go Home page</Link>
        </div>
      </form>
    </div>
  );
};

const Register: FC<AuthorizationProps> = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<User>({ resolver: UserResolver });
  const { registerUser, setAppAlert } = useActions();

  const { loading } = useTypedSelector(state => state.user);
  const history = useHistory();

  const onSubmit = async (formData) => {
    console.log(formData)
    if (formData.password !== formData.confirm) return setAppAlert('Password wasn\'t confirmed', statuses.ERROR);
    registerUser(formData, () => history.push(routes.AUTH.LOGIN));
    reset();
  };

  return (
    <div className={styles.authorization}>
      <HTag size="large" className={styles.naming}>Quiz App</HTag>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <HTag size="large" className={styles.title}>Sign Up</HTag>
        <div className={styles.inputBlock}>
          <Input
            {...register('nickname')}
            error={errors.nickname}
            type="text"
            label='Nickname'
            disabled={loading}
          />
        </div>
        <div className={styles.inputBlock}>
          <Input
            {...register('email')}
            error={errors.email}
            type="text"
            label="Email"
            disabled={loading}
          />
        </div>
        <div className={styles.inputBlock}>
          <Input
            {...register('password')}
            error={errors.password}
            type="password"
            label="Password"
            disabled={loading}
          />
        </div>
        <div className={styles.inputBlock}>
          <Input
            {...register('confirm')}
            error={errors.confirm}
            type='password'
            label='Confirm Password'
            disabled={loading}
          />
        </div>
        <Button className={styles.button} type="submit" disabled={loading}>Sign Up</Button>
        <div className={styles.info}>
          <Link to={routes.AUTH.LOGIN}>Back to login</Link>
          <Link to={routes.HOME}>Go Home page</Link>
        </div>
      </form>
    </div>
  );
};

const Reset: FC<AuthorizationProps> = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm<User>()
  const { setAppAlert, resetUserPassword } = useActions();
  const { loading } = useTypedSelector(state => state.user);
  const [isSent, setIsSent] = useState<boolean>(loading);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  useEffect(() => {
    // const resetToken = pathname.split('/')[pathname.split('/').length - 1]
    // if (resetToken && resetToken !== 'reset') {
    //   const getAccess = async () => {
    //     try {
    //       const data = await request<IUserResetPassword>(pathname + '/' + resetToken, 'GET');
    //       setIsResetting(data.isAccessed);
    //     } catch (err: any) {
    //       setIsResetting(false);
    //       setAppAlert(err.message, statuses.ERROR)
    //     }
    //   }
    //   getAccess();
    // }
  }, []);

  const handleEmailSending = async (formData) => {
    resetUserPassword(formData);
    !loading && setIsSent(true);
  };

  const handleReset = async (formData) => {
    if (formData.password !== formData.confirm) throw new Error('Password wasn\'t confirmed');
    // userReset(formData, resetToken);
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
                  <Link to={routes.HOME}>Go Home page</Link>
                </div>
            </Card>
            : <form className={styles.form} onSubmit={handleSubmit(handleEmailSending)}>
              <HTag size="large" className={styles.title}>Access Recovery</HTag>
              <div className={styles.inputBlock}>
                {/*<Input*/}
                {/*  type="text"*/}
                {/*  label="Email for recovery process"*/}
                {/*  {...register('email')}*/}
                {/*  disabled={loading}*/}
                {/*/>*/}
              </div>
              <Button className={styles.button} type="submit" disabled={loading}>Send email message</Button>
              <div className={styles.info}>
                <Link to={routes.AUTH.LOGIN}>Back to login</Link>
                <Link to={routes.HOME}>Go Home page</Link>
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
                <Link to={routes.HOME}>Go Home page</Link>
              </div>
            </form>
          </>
      }
    </div>
  );
};

const Activate: FC<any> = () => {
  const { activationLink } = useParams<{ activationLink: string; }>();
  const { activateUserAccount } = useActions();
  useEffect(() => {
    activateUserAccount(activationLink);
  });
  return <></>;
}

export const Authorization: FC<AuthorizationProps> = (props) => {
  return (
    <div className={styles.authorizationWrapper}>
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
        <Route path={routes.AUTH.ACTIVATE + '/:activationLink'} exact>
          <Activate {...props}/>
        </Route>
      </Switch>
    </div>
  );
};

export default withAuthLayout(Authorization);