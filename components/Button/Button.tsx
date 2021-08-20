import React from 'react';
import { ButtonProps } from './Button.props';
import styles from './Button.module.css';

export const Button = ({ children, className }: ButtonProps): JSX.Element => {
  return (
    <button className={className}>{children}</button>
  );
};