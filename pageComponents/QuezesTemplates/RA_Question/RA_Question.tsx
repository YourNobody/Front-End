import React, { FC } from 'react';
import { RA_QuestionProps } from './RA_Question.props';
import styles from './RA_Question.module.css';
import { HTag, Image, Card, Button, HR } from '../../../components/index';
import { useState } from 'react';
import { checkForValideImageLink } from '../../../helpers/custom.helper';
import parse from 'html-react-parser';

export const RA_Question: FC<RA_QuestionProps> = ({ content, usersAnswers, title, question, creator, ...props }) => {
  const [sliderValue, setSliderValue] = useState<string | number>(0);

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
  };

  const buildAccordingToTarget = () => {
    if (checkForValideImageLink(content)) {
      return (
        <>
          {question ? <div className={styles.question}>{parse(question)}</div> : <></>}
          <Image src={content} className={styles.image}/>
        </>
      );
    } else {
      return <div className={styles.question}>{question}</div>;
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
        <Button color='ghost'>Save mark</Button>
      </div>
    </Card>
  );
};