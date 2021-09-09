import React, { FC } from 'react';
import { TA_QuestionProps } from './TA_Question.props';
import styles from './TA_Question.module.css';
import { HTag, Editor, Card, Button, HR } from '../../../../components/index'; 

export const TA_Question: FC<TA_QuestionProps> = () => {
  return (
    <Card className={styles.questionWrapper}>
      <HTag size="m" className={styles.question}>How are you?</HTag>
      <HTag size="s" className={styles.answerTitle}>Your answer:</HTag>
      <Editor />
      <HR color="gray" className={styles.hr}/>
      <div className={styles.info}>
        <HTag size="s">Answers:&nbsp;11</HTag>
        <Button color="primary">Save answer</Button>
      </div>
    </Card>
  );
};