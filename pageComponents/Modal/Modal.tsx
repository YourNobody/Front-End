import React, { FC } from 'react';
import { ModalProps } from './Modal.props';
import styles from './Modal.module.css';
import { Card, Button, HTag } from '../../components/index';
import cn from 'classnames';
import { useTypedSelector } from './../../hooks/useTypedSelector.hook';
import { useActions } from '../../hooks/useActions.hook';

export const getModalBoilerplate = (question: string, actionFunc: () => void, actionTitle: string, closeFunc: () => void, closeTitle?: string): JSX.Element => {
  return (
    <>
      <HTag size="m" className={styles.modalTitle}>{question}</HTag>
      <div className={styles.modalActions}>
        <Button color="ghost" onClick={closeFunc}>{closeTitle || 'No'}</Button>
        <Button color="danger" onClick={actionFunc}>{actionTitle}</Button>
      </div>
    </>
  );
};

export const Modal: FC<ModalProps> = ({
  children,
  className,
  ...props
}) => {
  const { modalConfig } = useTypedSelector(state => state.app);
  const { closeModal } = useActions();

  const handleCloseModal = (e) => {
    const { wrapper } = e.target.dataset;
    if (wrapper) {
      closeModal();
    }
  };
  return (
    <>
      {children}
      {modalConfig && <div {...props}
        className={cn(styles.modalWrapper, className)}
        onClick={handleCloseModal}
        data-wrapper
      >
        <Card className={styles.modal}>
            <HTag size="m" className={styles.modalTitle}>{modalConfig.modalQuestion}</HTag>
            <div className={styles.modalActions}>
              <Button color="ghost" onClick={modalConfig.closeFunc || closeModal}>{modalConfig.closeButtonName || 'No'}</Button>
              <Button color="danger" onClick={modalConfig.actionFunc}>{modalConfig.actionButtonName}</Button>
            </div>
        </Card>
      </div>
      }
    </>
  );
};