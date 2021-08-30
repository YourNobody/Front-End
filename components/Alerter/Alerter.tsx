import React, { useEffect, useRef, useState } from 'react';
import { AlerterProps } from './Alerter.props';
import styles from './Alerter.module.css';
import cn from 'classnames';
import { useTypedSelector } from '../../hooks/useTypedSelector.hook';

export const Alerter = ({ ...props }: AlerterProps): JSX.Element => {
  const [error, setError] = useState(useTypedSelector(state => state).user.error);

  const handleCloseIcon = () => {
    setError(null);
  };

  useEffect(() => {
    setTimeout(() => setError(null), 5000);
  }, []);

  return (
    <div
      {...props}
      className={cn(styles.alerter, {
        [styles.success]: !error,
        // [styles.warning]: status === statuses.WARNING,
        [styles.error]: error
      })}
    >
      <div className={styles.close} onClick={handleCloseIcon}>&#10006;</div>
      <div className={styles.message}>{
        error ? error : 'Успех, Бро!'
      }</div>
    </div>
  );
};