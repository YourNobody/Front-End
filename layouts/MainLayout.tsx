import React, {FC} from 'react';
import { Helmet } from 'react-helmet';
import { Header, Footer } from '../pageComponents/index';
import { MainLayoutProps } from './MainLayout.props';

const MainLayout = ({ children, title = 'Quiz App | Home' }: MainLayoutProps): JSX.Element => {
  return (
    <>
      <Helmet>
        <meta name="Description" content="application: Quiz App, frameworks: React & Express" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <title>{'Quiz App | ' + title}</title>
      </Helmet>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}

export function withMainLayout<T extends MainLayoutProps>(Component: FC<T>) {
  return function(props: T): JSX.Element {
    return (
      <MainLayout title={props.title}>
        <Component {...props}/>
      </MainLayout>
    )  
  };
}