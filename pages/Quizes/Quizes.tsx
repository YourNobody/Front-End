import React, { FC } from 'react';
import { QuizesProps } from './Quizes.props';
import styles from './Quizes.module.css';
import { withMainLayout } from '../../layouts/MainLayout/MainLayout';
import cn from 'classnames';
import { Card, Image } from '../../components';

export const Quizes: FC<QuizesProps> = ({ className, ...props }) => {
  return (
    <div {...props} className={cn(styles.quizPage, className)}>
      <Card className={styles.card}>
        <Image text="Temp Image" className={styles.image} />
          <div className={styles.description}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde iste amet minima placeat soluta aliquam quidem. Nostrum deleniti cupiditate ipsa.
          </div>
      </Card>
    </div>
  );
};

export default withMainLayout(Quizes);