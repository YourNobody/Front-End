import React, {FC} from 'react';
import { Header } from '../pageComponents/index';
import { Footer } from '../pageComponents/index';
import { MainLayoutProps } from './MainLayout.props';

const MainLayout = ({ children }: MainLayoutProps): JSX.Element => {
  return (
    <>
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