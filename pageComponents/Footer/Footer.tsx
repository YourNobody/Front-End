import React from 'react';
import { FooterProps } from './Footer.props';
import styles from './Footer.module.css';
import cn from 'classnames';

export const Footer = ({ className }: FooterProps): JSX.Element => {
  return (
    <div className={cn(styles.footer, className)}>
      <div className={styles.appName}>Quiz App</div>
      <a href="#">Terms of use</a>
    </div>
  );
};