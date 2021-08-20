import React, {FC} from 'react';
import { Helmet } from 'react-helmet';
import { Header, Footer } from '../../pageComponents/index';
import { AuthLayoutProps } from './AuthLayout.props';

const AuthLayout = ({ children, title = 'Authorization' }: AuthLayoutProps): JSX.Element => {
  return (
    <>
      <Helmet>
        <meta name="Description" content="authorization to Quiz App, application: Quiz App, frameworks: React & Express" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <title>{'Quiz App | ' + title}</title>
      </Helmet>
      <main>
        {children}
      </main>
    </>
  )
}

export function withAuthLayout<T extends AuthLayoutProps>(Component: FC<T>) {
  return function(props: T): JSX.Element {
    return (
      <AuthLayout title={props.title}>
        <Component {...props}/>
      </AuthLayout>
    )  
  };
}