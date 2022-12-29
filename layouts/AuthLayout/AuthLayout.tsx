import {FC, Profiler} from 'react';
import { Helmet } from 'react-helmet';
import { AuthLayoutProps } from './AuthLayout.props';
import styles from './AuthLayout.module.scss';

const AuthLayout: FC<AuthLayoutProps> = ({ children, title = 'Authorization' }): JSX.Element => {
  return (
    <>
      <Helmet>
        <meta name="Description" content="authorization to QuizSA App, application: QuizSA App, frameworks: React & Express" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <title>{'QuizSA App | ' + title}</title>
      </Helmet>
      <main className={styles.authLayout}>
        {children}
      </main>
    </>
  )
}

const logTimes = (id, phase, actualTime, baseTime, startTime, commitTime) => {
  // console.log(`${id}'s ${phase} phase:`);
  // console.log(`Actual time: ${actualTime}`);
  // console.log(`Base time: ${baseTime}`);
  // console.log(`Start time: ${startTime}`);
  // console.log(`Commit time: ${commitTime}`);
};

export function withAuthLayout<T extends AuthLayoutProps>(Component: FC<T>) {
  return function(props: T): JSX.Element {
    return (
      <Profiler id="auth" onRender={logTimes}>
        <AuthLayout title={props.title}>
          <Component {...props}/>
        </AuthLayout>
      </Profiler>
    );
  };
}