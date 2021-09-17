import { FC } from 'react';
import { QuizProps } from './Quiz.props';
import styles from './Quiz.module.css';
import { withMainLayout } from '../../layouts/MainLayout/MainLayout';
import { useParams } from 'react-router-dom';
import { QuestionParamsTypes, QuestionTypes } from '../../interfaces/quizes.interface';
import { SA_QuestionProps } from '../../pageComponents/Question/QuestionsTemplates/SA_Question/SA_Question.props';
import { SA_Question, TA_Question, RA_Question, AB_Question } from '../../pageComponents/Question/QuestionsTemplates/index';
import { TA_QuestionProps } from '../../pageComponents/Question/QuestionsTemplates/TA_Question/TA_Question.props';
import { RA_QuestionProps } from '../../pageComponents/Question/QuestionsTemplates/RA_Question/RA_Question.props';
import { AB_QuestionProps } from '../../pageComponents/Question/QuestionsTemplates/AB_Question/AB_Question.props';
import { getObjectWithDefinedKeys } from '../../helpers/custom.helper';

export const Quiz: FC<any> = () => {
  const questionData = JSON.parse(sessionStorage.getItem('questionData'));
  const { qType, title } = useParams<QuestionParamsTypes>();
  switch (qType.toUpperCase()) {
    case QuestionTypes.SA: {
      const payload = returnAppropriatePayload(qType, questionData) as SA_QuestionProps;
      return <SA_Question {...payload} />;
    }
    case QuestionTypes.TA: {
      const payload = returnAppropriatePayload(qType, questionData) as TA_QuestionProps;
      return <TA_Question {...payload}/>;
    }
    case QuestionTypes.RA: {
      const payload = returnAppropriatePayload(qType, questionData) as RA_QuestionProps;
      return <RA_Question {...payload}/>;
    }
    case QuestionTypes.AB: {
      const payload = returnAppropriatePayload(qType, questionData) as AB_QuestionProps;
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