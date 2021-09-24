import React, { FC } from 'react';
import { ModalProps } from './Modal.props';
import styles from './Modal.module.css';
import { Card, Button, HTag } from '../../components/index';
import cn from 'classnames';
import { useTypedSelector } from './../../hooks/useTypedSelector.hook';
import { useActions } from '../../hooks/useActions.hook';

export const ModalBoilerplate = (question: string, closeModal, actionFunc: () => void, actionTitle: string) => {
  return (
    <>
      <HTag size="m" className={styles.modalTitle}>{question}</HTag>
      <div className={styles.modalActions}>
        <Button color="ghost" onClick={closeModal}>No</Button>
        <Button color="danger" onClick={actionFunc}>{actionTitle}</Button>
      </div>
    </>
  );
};

export const Modal: FC<ModalProps> = ({ children, className, ...props }) => {
  const { modalTemplate } = useTypedSelector(state => state.app);
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
      {modalTemplate && <div {...props}
        className={cn(styles.modalWrapper, className)}
        onClick={handleCloseModal}
        data-wrapper
      >
        <Card className={styles.modal}>
          {modalTemplate}
        </Card>
      </div>
      }
    </>
  );
};