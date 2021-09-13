import React, { FC, useCallback, useState } from 'react';
import { AB_QuestionProps } from './AB_Question.props';
import styles from './AB_Question.module.css';
import { HTag, Button, HR, Card, Image } from '../../../../components/index';
import { checkForValideImageLink } from '../../../../helpers/custom.helper';
import cn from 'classnames';

export const AB_Question: FC<AB_QuestionProps> = ({question, questionAnswers, usersAnswers, creator, ...props}) => {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelectedClick = (index: number | null) => {
    setSelected(index);
  };

  const buildQuestionAnswers = (): JSX.Element[] => {
    function classNameWithSelected(index: number, ...classNames: string[]) {
      return cn(...classNames, {
        [styles.selected]: selected === index,
      });
    }

    function renderImages(type: 'text' | 'image'): JSX.Element[] {
      return questionAnswers.map((answer, index) => {
        if (type === 'text') return <Image
          key={answer}
          onClick={() => handleSelectedClick(index)}
          fully
          text={answer}
          className={classNameWithSelected(index, styles.imageText)}
        />;
        if (type === 'image') return <Image
          key={answer}
          onClick={() => handleSelectedClick(index)}
          src={answer}
          className={classNameWithSelected(index, styles.image)}
          fit="contain"
        />;
        return <></>;
      });
    }

    let isImagesValid = true;
    questionAnswers.forEach(answer => {
      if (!checkForValideImageLink(answer)) isImagesValid = false;
    });
    
    if (isImagesValid) {
      return renderImages('image');
    } else {
      return renderImages('text');
    }
  };
  
  if (!question || questionAnswers.length < 2) return <></>;
  return (
    <Card className={styles.questionWrapper} {...props}>
      <div className={styles.question}>{question}</div>
      <div className={styles.answersWrraper}>
        {buildQuestionAnswers()}
      </div>
      <HR color="gray" className={styles.hr}/>
      <div className={styles.info}>
        <HTag size="s" className={styles.allAnswers}>Answers:&nbsp;{usersAnswers.length}</HTag>
        <Button className={styles.reset} onClick={() => handleSelectedClick(null)}>Reset</Button>
        <Button color="primary">Save answer</Button>
      </div>
    </Card>
  );
};