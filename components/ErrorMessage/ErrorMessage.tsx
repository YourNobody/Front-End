import React, { FC } from 'react';
import { ErrorMessageProps } from './ErrorMessage.props';
import styles from './ErrorMessage.module.css';
import cn from 'classnames';

export const ErrorMessage: FC<ErrorMessageProps> = ({ children, className, ...props }) => {
  if (!children) return <></>;
  return <span
    {...props}
    className={cn(styles.error, className)}
  >{children}</span>;
};