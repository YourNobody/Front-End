import React, { FC } from 'react';
import { TA_QuestionProps } from './TA_Question.props';
import styles from './TA_Question.module.css';
import { HTag, Editor, Card, Button, HR } from '../../../components/index'; 
import { useState } from 'react';

export const TA_Question: FC<TA_QuestionProps> = () => {
  const [hidden, setHidden] = useState<boolean>(true);

  return (
    <Card className={styles.questionWrapper}>
      <HTag size="m" className={styles.question}>How are you?</HTag>
      {
        hidden && <Button color="ghost" className={styles.toAnswer} onClick={() => setHidden(false)}>Click to leave your answer</Button>
      }
      {
        !hidden && <Editor />
      }
      <HR color="gray" className={styles.hr}/>
      <div className={styles.info}>
        <HTag size="s">Answers:&nbsp;11</HTag>
        <Button color="primary">Save answer</Button>
      </div>
    </Card>
  );
};