import React, { FC } from 'react';
import { TaggerProps } from './Tagger.props';
import styles from './Tagger.module.css';
import { getRandomColor } from '../../helpers/css.helper';
import cn from 'classnames';

export const Tagger: FC<TaggerProps> = ({ children, className, ...props }): JSX.Element => {
  return (
    <div
      {...props}
      className={cn(styles.tagger, className)}
    >
      {children}
    </div>
  );
};