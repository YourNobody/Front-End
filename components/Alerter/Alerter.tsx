import React, { FC } from 'react';
import { AlerterProps } from './Alerter.props';
import styles from './Alerter.module.css';
import { statuses } from '../../constants/vars';
import cn from 'classnames';

export const Alerter: FC<AlerterProps> = ({ message = '', status, ...props }) => {
  if (message ?? status) {
    return (
      <div
        {...props}
        className={cn(styles.alerter, {
          [styles.success]: status === statuses.SUCCESS,
          [styles.warning]: status === statuses.WARNING,
          [styles.error]: status === statuses.ERROR
        })}
      >
        <div className={styles.close}>&#10006;</div>
        <div className={styles.message}>{message}</div>
      </div>
    );
  }
};