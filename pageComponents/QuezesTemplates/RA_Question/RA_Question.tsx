import React, { FC } from 'react';
import { RA_QuestionProps } from './RA_Question.props';
import styles from './RA_Question.module.css';
import { HTag, Image, Card, Button, HR } from '../../../components/index';
import { useState } from 'react';
import { checkForValideImageLink } from '../../../helpers/custom.helper';
import parse from 'html-react-parser';
import { IUserAnswer } from '../../../interfaces/quizes.interface'

export const RA_Question: FC<RA_QuestionProps> = ({ onSave, id, quizAnswers, usersAnswers, title, question, creator, ...props }) => {
  const [sliderValue, setSliderValue] = useState<string | number>(0);
  if (!quizAnswers) return <></>;

  const handleUserAnswerSave = () => {
    const body = {} as IUserAnswer & { quizId?: string, answer?: any };
    body.quizId = id;
    body.answer = {};
    onSave(body);
  };

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
  };
  
  const buildAccordingToTarget = () => {
    if (checkForValideImageLink(quizAnswers[0].answer)) {
      return (
        <div>
          {question ? <div className={styles.question}>{parse(question)}</div> : <></>}
          <Image src={quizAnswers[0].answer} className={styles.image}/>
        </div>
      );
    } else {
      return <div className={styles.question}>{parse(question)}</div>;
    }
  };

  return (
    <Card className={styles.questionWrapper} {...props}>
      <HTag size="m" className={styles.questionTitle}>{title}</HTag>
      {buildAccordingToTarget()}
      <HR color="gray" className={styles.hr}/>
      <div className={styles.answerWrapper}>
        <input
          className={styles.slider}
          type="range"
          min="0"
          max="10"
          step="1"
          value={sliderValue}
          onChange={handleSliderChange}
        />
        <HTag size="s" className={styles.markWrapper}>You mark:&nbsp;<span className={styles.mark}>{sliderValue}</span></HTag>
        <Button color='ghost' onClick={handleUserAnswerSave}>Save mark</Button>
      </div>
    </Card>
  );
};