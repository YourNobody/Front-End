import { FC } from 'react';
import { QuizProps } from './Quiz.props';
import styles from './Quiz.module.css';
import { withMainLayout } from '../../layouts/MainLayout/MainLayout';
import { useParams } from 'react-router-dom';
import { QuestionParamsTypes, QuestionTypes } from '../../interfaces/quizes.interface';
import { SA_Question, TA_Question, RA_Question, AB_Question } from '../../pageComponents/index';
import { getObjectWithDefinedKeys } from '../../helpers/custom.helper';
import { LOCALSTORAGE_QUIZ_DATA_NAME } from '../../constants/app';
import { useActions } from '../../hooks/useActions.hook';
import { useTypedSelector } from '../../hooks/useTypedSelector.hook';

export const Quiz: FC<any> = () => {
  const { selectedQuiz } = useTypedSelector(state => state.quiz);
  const { qType, title } = useParams<QuestionParamsTypes>();
  switch (qType.toUpperCase()) {
    case QuestionTypes.SA: {
      const payload = returnAppropriatePayload(qType, selectedQuiz);
      return <SA_Question {...payload} />;
    }
    case QuestionTypes.TA: {
      const payload = returnAppropriatePayload(qType, selectedQuiz);
      return <TA_Question {...payload}/>;
    }
    case QuestionTypes.RA: {
      const payload = returnAppropriatePayload(qType, selectedQuiz);
      return <RA_Question {...payload}/>;
    }
    case QuestionTypes.AB: {
      const payload = returnAppropriatePayload(qType, selectedQuiz);
      return <AB_Question {...payload}/>;
    }
    default: return <></>;
  }
};

export default withMainLayout(Quiz);

function returnAppropriatePayload(type: QuestionTypes, data: any) {
  const mainPayload = ['question', 'usersAnswers', 'creator', 'title', '_id'];
  let additionalKeys: string[] = [];
  if (!type) return {};
  switch (type.toUpperCase()) {
    case QuestionTypes.SA:
      additionalKeys = ['quizAnswers'];
      return getObjectWithDefinedKeys(data, [...mainPayload, ...additionalKeys]);
    case QuestionTypes.TA:
      return getObjectWithDefinedKeys(data, [...mainPayload, ...additionalKeys]);
    case QuestionTypes.RA:
      additionalKeys = ['quizAnswers'];
      return getObjectWithDefinedKeys(data, [...mainPayload, ...additionalKeys]);
    case QuestionTypes.AB:
      additionalKeys = ['quizAnswers'];
      return getObjectWithDefinedKeys(data, [...mainPayload, ...additionalKeys]); 
    default: return getObjectWithDefinedKeys(data, [...mainPayload, ...additionalKeys]);
  }
}