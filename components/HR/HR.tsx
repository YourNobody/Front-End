import React, { FC } from 'react';
import { HRProps } from './HR.props';
import styles from './HR.module.css';
import cn from 'classnames';

export const HR: FC<HRProps> = ({className, color = 'white', ...props}) => {
  return (
    <hr {...props} className={cn(styles.hr, className, {
      [styles.white]: color === 'white',
      [styles.gray]: color === 'gray',
      [styles.blue]: color === 'blue'
    })}></hr>
  );
};