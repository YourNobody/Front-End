import React, { FC, useState, useEffect } from 'react';
import { AlerterProps } from './Alerter.props';
import styles from './Alerter.module.css';
import cn from 'classnames';
import { useTypedSelector } from '../../hooks/useTypedSelector.hook';
import { ALERT_BEFORE_DISAPPEAR, statuses } from '../../constants/app';
import { useActions } from '../../hooks/useActions.hook';

export const Alerter: FC<AlerterProps> = ({children, ...props}) => {
  const { alerts, newAlert } = useTypedSelector(state => state.app);
  const { clearAppAlert, clearAllAppAlerts } = useActions();
  
  const handleCloseIcon = (e, id: string) => {
    setTimeout(() => clearAppAlert(id), 0);
  };

  useEffect(() => {
    if (!newAlert && !newAlert.id) return;
    const { toDeleteStream, toDeleteAllBefore, isAutoDeleted } = newAlert.options;
    if (toDeleteStream) {
      const sub = toDeleteStream.subscribe(value => {
        if (value.readyToDelete) {
          clearAppAlert(newAlert.id);
          sub.unsubscribe();
          toDeleteAllBefore && clearAllAppAlerts();
        }
      })
    } else if (newAlert && newAlert.id && isAutoDeleted) {
      setTimeout(() => clearAppAlert(newAlert.id), ALERT_BEFORE_DISAPPEAR);
    }
  }, [newAlert]);

  return (
    <>
      {children}
      {
        alerts.length ? <div {...props} className={cn(styles.alerterWrapper, props.className)}>
          {
            alerts.length && alerts.filter(alert => !!alert.message).map(alert => {
              return (
                <div
                  key={alert.id}
                  className={cn(styles.alerter, {
                    [styles.success]: alert.status === statuses.SUCCESS,
                    [styles.warning]: alert.status === statuses.WARNING,
                    [styles.error]: alert.status === statuses.ERROR
                  })}
                >
                  <div className={styles.close} onClick={(e) => handleCloseIcon(e, alert.id)}>
                    <div>&#10006;</div>
                  </div>
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