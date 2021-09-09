import React, { FC } from 'react';
import { SA_QuestionProps } from './SA_Question.props';
import styles from './SA_Question.module.css';
import { Card, HTag, Tagger } from '../../../../components/index';

export const SA_Question: FC<SA_QuestionProps> = ({ question, answers }) => {
  if (!answers.length) return <></>;
  return (
    <Card
      className={styles.questionWrapper}
    >
      <HTag size="m" className={styles.question}>{question}</HTag>
      <div className={styles.answers}>
        {
          answers.reduce((tags: JSX.Element[], answer: string, index) => {
            if (answer.trim()) {
              tags.push( <Tagger key={index} className={styles.single} >{answer}</Tagger> );
              return tags;
            }
            return tags;
          }, [])
        }
      </div>
      <div className={styles.info}>
        <HTag size="s">Answers: 12</HTag>
        <HTag size="s">Creator: Pavel Yurchenko</HTag>
      </div>
    </Card>
  );
};