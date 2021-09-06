import React, {FC, PropsWithChildren} from 'react';
import { Helmet } from 'react-helmet';
import { Header, Footer } from '../../pageComponents/index';
import { MainLayoutProps } from './MainLayout.props';
import styles from './MainLayout.module.css';

const MainLayout: FC<MainLayoutProps> = ({ children, title = 'Home', ...props }): JSX.Element => {
  return (
    <div {...props}
      className={styles.layout}
    >
      <Helmet>
        <meta name="Description" content="application: Quiz App, frameworks: React & Express" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <title>{'Quiz App | ' + title}</title>
      </Helmet>
      <Header className={styles.header}/>
      <main className={styles.body}>
        {children}
      </main>
      <Footer className={styles.footer}/>
    </div>
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