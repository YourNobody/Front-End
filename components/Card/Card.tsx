import React, { FC } from 'react';
import { CardProps } from './Card.props';
import styles from './Card.module.css';
import cn from 'classnames';

export const Card: FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div {...props}
      className={cn(styles.card, className)}
    >
      {children}
    </div>
  );
};