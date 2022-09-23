import React, {FC, useCallback, useEffect, useState} from 'react'
import {withMainLayout} from '@Layouts';
import {useLocation, useParams} from 'react-router-dom';
import {IUserAnswer, MainQuestionsProps, QuestionParamsTypes, QuizzesTypes} from '../../interfaces/quizes.interface';
import {useActions, useTypedSelector, useQuizAnswerController} from '@Hooks';
import {Button, Card, Editor, HR, HTag, Tagger} from '../../components'
import { QuizTemplate } from "./Quiz.template";

export const Quiz: FC<any> = ({ ...props }) => {
	const { qType, orderNumber, title } = useParams() as any;
	const {getQuiz} = useActions();
	const {selectedQuiz} = useTypedSelector(state => state.quiz) as any;

	useEffect(() => {
		selectedQuiz || getQuiz(qType, orderNumber, title);
	}, [selectedQuiz]);

	if (!selectedQuiz) {
		return <Card>Quiz is loading...</Card>
	}

	return <>
		{ QuizTemplate(qType, { quiz: selectedQuiz }) }
	</>;
};

export default withMainLayout(Quiz);
