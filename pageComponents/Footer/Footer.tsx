import React, { FC } from 'react';
import { FooterProps } from './Footer.props';
import styles from './Footer.module.css';
import cn from 'classnames';

export const Footer: FC<FooterProps> = ({ className, ...props }) => {
  return (
    <div className={cn(styles.footer, className)} {...props}>
      <div className={styles.appName}>Quiz App</div>
      <a href="#">Terms of use</a>
    </div>
  );
};