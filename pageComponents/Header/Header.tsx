import React, { useEffect, useState } from 'react';
import { HeaderProps } from './Header.props';
import styles from './Header.module.css';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { routes } from '../../constants/routes';
import { Image, HTag } from '../../components/index';
import { useTypedSelector } from '../../hooks/useTypedSelector.hook';
import { statuses } from '../../constants/app';
import { useActions } from '../../hooks/useActions.hook';

export const Header = ({ children, className, ...props }: HeaderProps): JSX.Element => {
  const {user, isAuthenticated, loading} = useTypedSelector(state => state.user);
  const {setAppAlert} = useActions();

  const getUserInitials = () => {
    const { firstName, lastName } = user;
    if (firstName && lastName) {
      return firstName + ' ' + lastName;
    } else if (firstName && !lastName) {
      return firstName;
    } else if (!firstName && lastName) {
      return lastName;
    }
    return 'Username';
  };

  // useEffect(() => {
  //   if (loading) {
  //     setAppAlert('User data is loading', statuses.WARNING);
  //   }
  // }, [loading]);
  
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
        {
          !isAuthenticated && <div className={styles.person}>
            <Link to={routes.AUTH.LOGIN}>
            <div className={cn(styles.question, styles.login)}>
                <p>Log In</p>
              </div>
            </Link>
          </div>
        }
        {isAuthenticated && <div className={styles.person}>
            <Link to={routes.QUIZES.CREATE}>
              <div className={styles.question}>
                <p>Create a question?</p>
              </div>
            </Link>
            {
              !loading 
              ? <div className={styles.personInfo}>
                  <Link to={routes.PROFILE.ACCOUNT}>
                    <div className={styles.name}>{getUserInitials()}</div>
                    <Image isCircled={true} className={styles.image}/>
                  </Link>
                </div>
              : <></>
            }
          </div>
        }
      </nav>
    </header>
  );
};