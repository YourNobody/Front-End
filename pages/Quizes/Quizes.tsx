import React from 'react';
import { QuizesProps } from './Quizes.props';
import styles from './Quizes.module.css';
import { withMainLayout } from '../../layouts/MainLayout/MainLayout';
import cn from 'classnames';
import { Card, Image, HTag } from '../../components';
import SA_Image from '../../src/assets/quiz-page/sa.jfif';
import TA_Image from '../../src/assets/quiz-page/ta.jpg';
import RA_Image from '../../src/assets/quiz-page/ra.jfif';
import AB_Image from '../../src/assets/quiz-page/ab.jfif';
import { useCallback } from 'react';
import { Link, Route } from 'react-router-dom';
import { routes } from './../../constants/routes';

export const Quizes = ({ className, ...props }: QuizesProps): JSX.Element => {

  // const handleCardHover = (e): void => {
  //   console.log('here');
  //   console.log(e.target.dataset);
  //   const el = e.target;
  //   let desc = null;
  //   if (el.dataset.target && el.dataset.target === 'card') {
  //     if (el.children && el.children.length) {
  //       desc = Array.from(el.children).find(child => child.tagName === 'P' && child.className.indexOf(styles.description) > -1);
  //     }
  //   } else {

  //   }
  // };

  return (
    <div {...props}
      className={cn(styles.quizPage, className)}
    >
      <Route path={routes.QUIZES.ROOT}>
        <Link to={routes.QUIZES.TYPES.SA}>
          <Card className={styles.card} data-target="card">
            <HTag>Select Questions</HTag>
            <p className={styles.description}>In this type of questions you can choose one or more answers</p>
            <Image src={SA_Image} text="Select Questions" fit="cover" className={styles.image}/>
          </Card>
        </Link>
        <Link to={routes.QUIZES.TYPES.TA}>
          <Card className={styles.card} data-target="card">
            <HTag>Text Questions</HTag>
            <p className={styles.description}>Here you need to answer a question using text and your own thoughts</p>
            <Image src={TA_Image} text="Text Questions" fit="cover" className={styles.image}/>
          </Card>
        </Link>
        <Link to={routes.QUIZES.TYPES.RA}>
          <Card className={styles.card} data-target="card">
            <HTag>Rating Questions</HTag>
            <p className={styles.description}>You can set a "Rating" as an answer</p>
            <Image src={RA_Image} text="Rating Questions" fit="cover" className={styles.image}/>
          </Card>
        </Link>
        <Link to={routes.QUIZES.TYPES.AB}>
          <Card className={styles.card} data-target="card">
            <HTag>A/B Question</HTag>
            <p className={styles.description}>It's questions that provide you for only two answers</p>
            <Image src={AB_Image} text="A/B Question" fit="cover" className={styles.image}/>
          </Card>
        </Link>
      </Route>
      <Route path={routes.QUIZES.TYPES.SA}></Route>
      <Route path={routes.QUIZES.TYPES.TA}></Route>
      <Route path={routes.QUIZES.TYPES.RA}></Route>
      <Route path={routes.QUIZES.TYPES.AB}></Route>
    </div>
  );
};

export default withMainLayout(Quizes);