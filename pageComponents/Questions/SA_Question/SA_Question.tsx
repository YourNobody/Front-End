import React, { FC, useCallback, useState } from 'react';
import { SA_QuestionProps } from './SA_Question.props';
import styles from './SA_Question.module.css';
import { Card, HTag, Tagger, Button, HR } from '../../../components/index';
import parse from 'html-react-parser';
import cn from 'classnames';

export const SA_Question: FC<SA_QuestionProps> = ({ question, answers }) => {
  const [selected, setSelected] = useState<number | null>(null);

  const handleTaggerClick = useCallback((index: number) => {
    setSelected(index);
  }, []);

  if (!answers || !answers.length) return <></>;
  return (
    <Card
      className={styles.questionWrapper}
    >
      <div className={styles.question}>{parse(question)}</div>
      <div className={styles.answers}>
        {
          answers.reduce((tags: JSX.Element[], answer: string, index) => {
            if (answer.trim()) {
              tags.push(<Tagger
                key={index}
                onClick={() => handleTaggerClick(index)}
                className={cn(styles.single, {
                  [styles.unselected]: selected !== index && selected !== null,
                  [styles.selected]: selected === index
                })}
              >{answer}</Tagger>);
              return tags;
            }
            return tags;
          }, [])
        }
      </div>
      <HR color="gray" className={styles.hr}/>
      <div className={styles.info}>
        <HTag size="s">Answers: 12</HTag>
        <div>
          {(selected !== null) ? <Button className={styles.reset} onClick={() => handleTaggerClick(null)}>Reset</Button> : <></>}
          <Button color="primary">Save answer</Button>
        </div>
      </div>
    </Card>
  );
};