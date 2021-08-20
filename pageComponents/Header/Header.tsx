import React from 'react';
import { HeaderProps } from './Header.props';
import styles from './Header.module.css';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { routes } from '../../constants/routes';
import { Image } from '../../components/index';

export const Header = ({ children, className, ...props }: HeaderProps): JSX.Element => {
  return (
    <header className={cn(styles.header, className)}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <Link to={routes.HOME}>
            <li>Home</li>
          </Link>
          <Link to={routes.QUIZES.ROOT}>
            <li>Quizes</li>
          </Link>
        </ul>
        <div className={styles.person}>
          <Link to={routes.QUIZES.CREATE}>
            <p className={styles.question}>Create a question?</p>
          </Link>
          <div className={styles.personInfo}>
            <div className={styles.name}>Username</div>
            <Image empty={true}/>
          </div>
        </div>
      </nav>
    </header>
  );
};