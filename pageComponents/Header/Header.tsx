import React, { FC, useEffect, useState } from 'react';
import { HeaderProps } from './Header.props';
import styles from './Header.module.css';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { routes } from '../../constants/routes';
import { Image } from '../../components/index';
import { useTypedSelector } from '../../hooks/useTypedSelector.hook';

export const Header: FC<HeaderProps> = ({ className, ...props }) => {
  const {user, isAuthenticated} = useTypedSelector(state => state.user);
  console.log( useTypedSelector(state => state));
  
  return (
    <header className={cn(styles.header, className)} {...props}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <Link to={routes.HOME}>
            <li>Home</li>
          </Link>
          <Link to={routes.QUIZES.ROOT}>
            <li>Quizes</li>
          </Link>
        </ul>
        {isAuthenticated && <div className={styles.person}>
            <Link to={routes.QUIZES.CREATE}>
              <div className={styles.question}>
                <p>Create a question?</p>
              </div>
            </Link>
            <div className={styles.personInfo}>
              <Link to={routes.PROFILE.ACCOUNT}>
                <div className={styles.name}>{user ? user.firstName + ' ' + user.lastName : 'Username'}</div>
                <Image isCircled={true} className={styles.image}/>
              </Link>
            </div>
          </div>
        }
      </nav>
    </header>
  );
};