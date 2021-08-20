import React from 'react';
import { QuizesProps } from './Quizes.props';
import styles from './Quizes.module.css';
import { withMainLayout } from '../../layouts/MainLayout/MainLayout';

export const Quizes = (props: QuizesProps): JSX.Element => {
  return (
    <h1>Quizes</h1>
  );
};

export default withMainLayout(Quizes);