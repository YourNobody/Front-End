import React, { FC } from 'react';
import { QuestionProps } from './Question.props';
import styles from './Question.module.css';
import { useParams } from 'react-router-dom';
import { QuestionParamsTypes, QuestionTypes } from '../../interfaces/quizes.interface';
import { SA_Question, TA_Question, RA_Question, AB_Question } from './QuestionsTemplates/index';
import { getObjectWithDefinedKeys } from '../../helpers/custom.helper';
import { TA_QuestionProps } from './QuestionsTemplates/TA_Question/TA_Question.props';
import { SA_QuestionProps } from './QuestionsTemplates/SA_Question/SA_Question.props';
import { RA_QuestionProps } from './QuestionsTemplates/RA_Question/RA_Question.props';
import { AB_QuestionProps } from './QuestionsTemplates/AB_Question/AB_Question.props';

export const Question: FC<any> = ({dataQuestion}) => {
  const { qType } = useParams<QuestionParamsTypes>();

  switch (qType.toUpperCase()) {
    case QuestionTypes.SA: {
      const payload = returnAppropriatePayload(qType, dataQuestion) as SA_QuestionProps;
      return <SA_Question {...payload} />;
    }
    case QuestionTypes.TA: {
      const payload = returnAppropriatePayload(qType, dataQuestion) as TA_QuestionProps;
      return <TA_Question {...payload}/>;
    }
    case QuestionTypes.RA: {
      const payload = returnAppropriatePayload(qType, dataQuestion) as RA_QuestionProps;
      return <RA_Question {...payload}/>;
    }
    case QuestionTypes.AB: {
      const payload = returnAppropriatePayload(qType, dataQuestion) as AB_QuestionProps;
      return <AB_Question {...payload}/>;
    }
    default: return <></>;
  }
};

function returnAppropriatePayload(type: QuestionTypes, data: any) {
  const mainPayload = ['question', 'usersAnswers', 'creator', 'title'];
  let additionalKeys = [];
  if (!type) return {};
  switch (type) {
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