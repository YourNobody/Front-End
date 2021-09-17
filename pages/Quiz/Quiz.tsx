import { FC } from 'react';
import { QuizProps } from './Quiz.props';
import styles from './Quiz.module.css';
import { withMainLayout } from '../../layouts/MainLayout/MainLayout';
import { useParams } from 'react-router-dom';
import { QuestionParamsTypes, QuestionTypes } from '../../interfaces/quizes.interface';
import { SA_Question, TA_Question, RA_Question, AB_Question } from '../../pageComponents/index';
import { getObjectWithDefinedKeys } from '../../helpers/custom.helper';
import { LOCALSTORAGE_QUIZ_DATA_NAME } from '../../constants/app';

export const Quiz: FC<any> = () => {
  const questionData = JSON.parse(localStorage.getItem(LOCALSTORAGE_QUIZ_DATA_NAME));
  const { qType, title } = useParams<QuestionParamsTypes>();
  switch (qType.toUpperCase()) {
    case QuestionTypes.SA: {
      const payload = returnAppropriatePayload(qType, questionData);
      return <SA_Question {...payload} />;
    }
    case QuestionTypes.TA: {
      const payload = returnAppropriatePayload(qType, questionData);
      return <TA_Question {...payload}/>;
    }
    case QuestionTypes.RA: {
      const payload = returnAppropriatePayload(qType, questionData);
      return <RA_Question {...payload}/>;
    }
    case QuestionTypes.AB: {
      const payload = returnAppropriatePayload(qType, questionData);
      return <AB_Question {...payload}/>;
    }
    default: return <></>;
  }
};

export default withMainLayout(Quiz);

function returnAppropriatePayload(type: QuestionTypes, data: any) {
  const mainPayload = ['question', 'usersAnswers', 'creator', 'title'];
  let additionalKeys: string[] = [];
  if (!type) return {};
  switch (type.toUpperCase()) {
    case QuestionTypes.SA:
      additionalKeys = ['questionAnswers'];
      return getObjectWithDefinedKeys(data, [...mainPayload, ...additionalKeys]);
    case QuestionTypes.TA:
      return getObjectWithDefinedKeys(data, [...mainPayload, ...additionalKeys]);
    case QuestionTypes.RA:
      additionalKeys = ['content'];
      return getObjectWithDefinedKeys(data, [...mainPayload, ...additionalKeys]);
    case QuestionTypes.AB:
      additionalKeys = ['questionAnswers'];
      return getObjectWithDefinedKeys(data, [...mainPayload, ...additionalKeys]); 
    default: return getObjectWithDefinedKeys(data, [...mainPayload, ...additionalKeys]);
  }
}