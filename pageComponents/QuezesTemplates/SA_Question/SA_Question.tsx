import React, { FC, useCallback, useState } from 'react';
import { SA_QuestionProps } from './SA_Question.props';
import styles from './SA_Question.module.css';
import { Card, HTag, Tagger, Button, HR } from '../../../components/index';
import parse from 'html-react-parser';
import cn from 'classnames';
import { useRequest } from './../../../hooks/useRequest';
import { useTypedSelector } from './../../../hooks/useTypedSelector.hook';
import { IUserAnswer } from './../../../interfaces/quizes.interface';

export const SA_Question: FC<SA_QuestionProps> = ({ _id, question, title, quizAnswers, usersAnswers, ...props }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const user = useTypedSelector(state => state.user.user)
  const { error, clearError, loading, request } = useRequest();

  const handleTaggerClick = useCallback((index: number) => {
    setSelected(index);
  }, []);

  const handleUserAnswerSave = async () => {
    const body: IUserAnswer = {};
    body.quizId = _id;
    body.answer = quizAnswers[selected];
    try {
      const data: any = await request('/quizes/save', 'POST', body, {});
      console.log(data.message);
    } catch (err) {
      console.error(err);
    }
  };

  if (!quizAnswers || !quizAnswers.length) return <></>;
  return (
    <Card
      {...props}
      className={styles.questionWrapper}
    >
      <HTag size="m" className={styles.questionTitle}>{title}</HTag>
      <div className={styles.question}>{parse(question)}</div>
      <div className={styles.answers}>
        {
          quizAnswers.reduce((tags: JSX.Element[], answer: any, index) => {
            console.log('a: ', answer);
            if (answer.answer && answer.answer.trim()) {
              tags.push(<Tagger
                key={index}
                onClick={() => handleTaggerClick(index)}
                className={cn(styles.single, {
                  [styles.unselected]: selected !== index && selected !== null,
                  [styles.selected]: selected === index
                })}
              >{answer.answer}</Tagger>);
              return tags;
            }
            return tags;
          }, [])
        }
      </div>
      <HR color="gray" className={styles.hr}/>
      <div className={styles.info}>
        <HTag size="s">Answers:&nbsp;{usersAnswers.length}</HTag>
        <div>
          {(selected !== null) ? <Button className={styles.reset} onClick={() => handleTaggerClick(null)}>Reset</Button> : <></>}
          <Button color="primary" onClick={handleUserAnswerSave}>Save answer</Button>
        </div>
      </div>
    </Card>
  );
};