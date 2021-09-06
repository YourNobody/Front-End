import React, { FC } from 'react';
import { ButtonProps } from './Button.props';
import styles from './Button.module.css';
import cn from 'classnames';

export const Button: FC<ButtonProps> = ({ children, className, color = 'primary', ...props }) => {
  return (
    <button {...props}
      className={cn(styles.button, className, {
        [styles.primary]: color === 'primary',
        [styles.ghost]: color === 'ghost'
      })}
    >{children}</button>
  );
};