import React, { FC, useCallback, useState } from 'react';
import { SA_QuestionProps } from './SA_Question.props';
import styles from './SA_Question.module.css';
import { Card, HTag, Tagger, Button, HR } from '../../../components/index';
import parse from 'html-react-parser';
import cn from 'classnames';
import { useTypedSelector } from './../../../hooks/useTypedSelector.hook';
import { IUserAnswer } from './../../../interfaces/quizes.interface';

export const SA_Question: FC<SA_QuestionProps> = ({ onSave, id, question, title, variants, answers, ...props }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const user = useTypedSelector(state => state.user.user)

  const handleTaggerClick = useCallback((index: number) => {
    setSelected(index);
  }, []);

  const handleUserAnswerSave = () => {
    const body = {} as IUserAnswer & { quizAnswerId?: string, quizId: string };
    body.quizId = id;
    body.quizAnswerId = variants.find((_, index) => selected === index)?._id;
    onSave(body);
  };
  return (
    <Card
      {...props}
      className={styles.questionWrapper}
    >
      <HTag size="m" className={styles.questionTitle}>{title}</HTag>
      <div className={styles.question}>{parse(question)}</div>
      <div className={styles.answers}>
        {
          variants.reduce((tags: JSX.Element[], variant: any, index) => {
            if (variant.answer && variant.answer.trim()) {
              tags.push(<Tagger
                key={index}
                onClick={() => handleTaggerClick(index)}
                className={cn(styles.single, {
                  [styles.unselected]: selected !== index && selected !== null,
                  [styles.selected]: selected === index
                })}
              >{variant.answer}</Tagger>);
              return tags;
            }
            return tags;
          }, [])
        }
      </div>
      <HR color="gray" className={styles.hr}/>
      <div className={styles.info}>
        <HTag size="s">Answers:&nbsp;{answers.length}</HTag>
        <div>
          {(selected !== null) ? <Button className={styles.reset} onClick={() => handleTaggerClick(null)}>Reset</Button> : <></>}
          <Button color="primary" onClick={handleUserAnswerSave}>Save answer</Button>
        </div>
      </div>
    </Card>
  );
};