import React, { FC } from 'react';
import { RA_QuestionProps } from './RA_Question.props';
import styles from './RA_Question.module.css';
import { HTag, Image, Card, Button, HR } from '../../../components/index';
import { useState } from 'react';
import { checkForValideImageLink } from '../../../helpers/custom.helper';

export const RA_Question: FC<RA_QuestionProps> = ({ target, content }) => {
  const [sliderValue, setSliderValue] = useState<string | number>(0);

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
  };

  const buildAccordingToTarget = () => {
    switch (target) {
      case 'question': {
        if (checkForValideImageLink(content)) return <></>;
        return <HTag>{content}</HTag>;
      }
      case 'image': {
        if (checkForValideImageLink(content)) return <Image src={content} className={styles.image}/>;
        return <></>;
      }
      default: return <></>;
    }
  };

  return (
    <Card className={styles.questionWrapper}>
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