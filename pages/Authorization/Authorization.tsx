import { FC, FormEvent, useEffect, useState } from 'react'
import { Controller, Resolver, useForm, UseFormHandleSubmit } from 'react-hook-form';
import { AuthorizationProps } from './Authorization.props';
import { withAuthLayout } from '../..//layouts/AuthLayout/AuthLayout';
import styles from './Authorization.module.css';
import { HTag, Input, Button, Card, HR } from '../../components';
import { queryKeys, routes } from '../../constants/routes';
import { Link, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { useActions } from '../../hooks/useActions.hook';
import { useRequest } from '../../hooks/useRequest';
import { statuses } from '../../constants/app';
import { getEmptyObject } from '../../helpers/custom.helper';
import { useResolver } from '../../hooks/useResolver.hook';
import { WithMessage } from '../../interfaces/quizes.interface';
import { IUserResetPassword, IUserWithToken, WithQuizes } from '../../interfaces/user.interface';
import { useInput } from '../../hooks/useInput.hook'

const Login: FC<AuthorizationProps> = () => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const { initial, resolver } = useResolver().User;
  const { register, handleSubmit, reset, formState: { errors } } = useForm<typeof initial>({
    resolver,
    context: { isValid: isValid }
  });
  const { setAppAlert, fetchUserError, fetchUserSuccess } = useActions();
  const { error, clearError, request, loading } = useRequest();
  const history = useHistory();

  const onSubmit = async (formData: UseFormHandleSubmit<any>) => {
    if (Object.keys(errors).length) return;
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
        <Button className={styles.button} type="submit">Log In</Button>
        <div className={styles.info}>
          <Link to={routes.AUTH.REGISTER}>No account?</Link>
          <Link to={routes.AUTH.RESET}>Forgot password?</Link>
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
    if (Object.keys(errors).length) return;
    if (formData.password !== formData.confirm) return setAppAlert('Password wasn\'t confirmed', statuses.ERROR);
    try {
      const data: WithMessage = await request('/auth/register', 'POST', formData);
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

const Reset: FC<AuthorizationProps> = () => {
  const history = useHistory();
  const { pathname, search } = useLocation();
  const { register, clearValues, handleSubmit } = useInput();
  const [isValid, setIsValid] = useState<boolean>(true);
  const { setAppAlert } = useActions();
  const { loading, request } = useRequest();
  const [isSent, setIsSent] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  useEffect(() => {
    const query = new URLSearchParams(search);
    if (query.get(queryKeys.RESET_TOKEN)) {
      const getAccess = async () => {
        try {
          const data = await request<IUserResetPassword>(pathname + search, 'GET');
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
    try {
      const data = await request<WithMessage>('/auth/reset', 'POST', formData);
      setAppAlert(data.message, statuses.SUCCESS);
      setIsSent(true);
      clearValues(formData);
    } catch (err) {
      setAppAlert(err.message, statuses.ERROR);
    }
  };

  const handleReset = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // const password = getValue('password');
      // const confirm = getValue('confirm');
      // if (password !== confirm) throw new Error('Password wasn\'t confirmed');
      // const body = { password, confirm };
      // const query = new URLSearchParams(search);
      // const data = await request<WithMessage>(pathname + search, 'POST', body);
      // setAppAlert(data.message, statuses.SUCCESS);
      // history.push(routes.AUTH.LOGIN);
      // clearValue();
    } catch (err) {
      setAppAlert(err.message, statuses.ERROR);
    }
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
            : <form className={styles.form} onSubmit={handleSubmit(handleEmailSending)}>
              <HTag size="large" className={styles.title}>Access Recovery</HTag>
              <div className={styles.inputBlock}>
                <Input
                   type="text"
                   label="Email for recovery process"
                  {...register('email')}
                />
              </div>
              <Button className={styles.button} type="submit">Send email message</Button>
              <div className={styles.info}>
                <Link to={routes.AUTH.LOGIN}>Back to login</Link>
              </div>
            </form>
          : <>
            <form className={styles.form} onSubmit={handleReset}>
              <HTag size="large" className={styles.title}>Access Recovery</HTag>
              <div className={styles.inputBlock}>
                <Input type="password"
                       label="Enter new password"

                       name="password"

                />
              </div>
              <div className={styles.inputBlock}>
                <Input type="password"
                       label="Confirm new password"

                       name="confirm"

                />
              </div>
              <Button className={styles.button} type="submit">Reset</Button>
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