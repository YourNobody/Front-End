import React, { MouseEvent, FC, useState, useEffect } from 'react';
import { AlerterProps } from './Alerter.props';
import styles from './Alerter.module.css';
import cn from 'classnames';
import { useTypedSelector } from '../../hooks/useTypedSelector.hook';
import { ALERT_BEFORE_DISAPPEAR, statuses } from '../../constants/app';
import { useActions } from '../../hooks/useActions.hook';

export const Alerter: FC<AlerterProps> = ({children, ...props}) => {
  const { alerts, newAlertId } = useTypedSelector(state => state.app);
  const { clearAppAlert } = useActions();
  
  const handleCloseIcon = (e, id: string | number) => {
    setTimeout(() => clearAppAlert(id), 300);
  };
  console.log('newAlertId: ', newAlertId);
  

  // useEffect(() => {
  //   console.log('here');
  //   setTimeout(() => clearAppAlert(newAlertId), ALERT_BEFORE_DISAPPEAR);
  // }, [alerts, clearAppAlert, newAlertId]);

  return (
    <>
      {children}
      {
        alerts.length ? <div {...props} className={cn(styles.alerterWrapper, props.className)}>
          {
            alerts.length && alerts.map(alert => {
              return (
                <div
                  key={alert.id}
                  className={cn(styles.alerter, {
                    [styles.success]: alert.status === statuses.SUCCESS,
                    [styles.warning]: alert.status === statuses.WARNING,
                    [styles.error]: alert.status === statuses.ERROR
                  })}
                >
                  <div className={styles.close} onClick={(e) => handleCloseIcon(e, alert.id)}>&#10006;</div>
                  <div className={styles.message}>{alert.message}</div>
                </div>
              );
            })
          }
        </div> : <></>
      }
    </>
  );
};