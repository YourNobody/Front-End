import React, {FC} from 'react';
import { Helmet } from 'react-helmet';
import { Header, Footer } from '../pageComponents/index';
import { MainLayoutProps } from './MainLayout.props';

const MainLayout = ({ children }: MainLayoutProps): JSX.Element => {
  return (
    <>
      <Helmet>
        <meta name="Description" content="application: Quiz App, frameworks: React & Express" />
      </Helmet>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}

export function withMainLayout<T>(Component: FC<T>) {
  return function(props: T): JSX.Element {
    return (
      <MainLayout>
        <Component {...props}/>
      </MainLayout>
    )  
  };
}