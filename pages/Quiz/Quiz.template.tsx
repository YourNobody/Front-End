import React, {FC, useState} from "react";
import {Button, Card, Editor, HR, HTag, Tagger, Image} from "@Components";
import styles from "./Quiz.module.scss";
import parse from "html-react-parser";
import cn from "classnames";
import {QuizzesTypes} from "@Interfaces/quizes.interface";
import {saveTemplateHelper} from "@Helpers";
import {Controller, useForm} from "react-hook-form";
import {useActions, useEstimation} from "@Hooks";
import {LazyLoadComponent} from "react-lazy-load-image-component";

const {getTemplate, toTemplates} = saveTemplateHelper('quiz.');

toTemplates<any>(QuizzesTypes.sa, ({quiz}) => {
	const {title, question, orderNumber, variants, type, answers, multiple, id} = quiz;
	const isMultiple = multiple && type === QuizzesTypes.sa;

	const [selected, setSelected] = useState<any | any[]>(isMultiple ? [] : null);
	const { saveUserAnswer, openModal } = useActions();

	function setCustomSelected(id: string, option?: 'reset') {
		if (isMultiple) {
			if (option === 'reset') return setSelected([]);
			if (selected.includes(id)) {
				const index = selected.findIndex(selectedId => selectedId === id);
				setSelected([
					...selected.slice(0, index),
					...selected.slice(index + 1)
				]);
			} else {
				setSelected([...selected, id]);
			}
		} else {
			if (option === 'reset') return setSelected(null);
			setSelected(id);
		}
	}

	function checkIfChosen() {
		if (isMultiple) return !!selected.length;
		else return !!selected;
	}

	function getSelected() {
		if (isMultiple) return selected.reduce((acc, item, index) => {
			if (index === 0) acc += item.answer;
			else acc += `, ${item.answer}`;
			return acc;
		}, '');
		else return selected ? selected.answer : '';
	}

	function checkSimilarity(variantId: string) {
		if (isMultiple) return !!selected.find(item => item.id === variantId);
		else return selected && selected.id && selected.id === variantId;
	}

	function prepareAnswerToDB(answer: any | any[]) {
		if (Array.isArray(answer)) {
			return answer.map(ans => {
				return { variantId: ans.id, answer: ans.answer };
			});
		}
		return [{ variantId: answer.id, answer: answer.answer }];
	}

	const handleUserAnswerSave = () => {
		if (!selected || (Array.isArray(selected) && !selected.length)) return;

		const answer = {
			orderNumber,
			quizId: id,
			quizType: type,
			answers: prepareAnswerToDB(selected),
			multiple: isMultiple || false
		};

		openModal({
			actionFunc: () => saveUserAnswer(id, answer),
			actionButtonName: 'Save answer',
			modalQuestion: 'Do you want to save your answer?'
		});
	};

	return <Card>
		<div
			className={styles.sa}
		>
			<HTag size="m" className={styles.questionTitle}>{title}</HTag>
			<div className={styles.question}>{parse(question)}</div>
			<div className={styles.answers}>
				{
					variants.reduce((tags: JSX.Element[], variant: any, index) => {
						if (variant.answer && variant.answer.trim()) {
							tags.push(<Tagger
								key={index}
								onClick={() => setCustomSelected(variant)}
								className={cn(styles.tagger, {
									[styles.unselected]: !checkSimilarity(variant.id),
									[styles.selected]: checkSimilarity(variant.id)
								})}
							>{variant.answer}</Tagger>);
							return tags;
						}
						return tags;
					}, [])
				}
			</div>
		</div>
		<HR color="gray" className={styles.hr}/>
		<div className={styles.info}>
			<div>
				<HTag size="s" className={styles.allAnswers}>Answers:&nbsp;{answers.length}</HTag>
				<Button color="primary" style={{marginRight: '15px'}} onClick={handleUserAnswerSave}>Save answer</Button>
				{checkIfChosen() ?
					<Button color="danger" onClick={() => setCustomSelected(null, 'reset')}>Reset</Button> : <></>}
			</div>
			{
				checkIfChosen() ? <div>
					Your answer: {getSelected()}
				</div> : <></>
			}
		</div>
	</Card>;
});

toTemplates<any>(QuizzesTypes.ta, ({quiz}): JSX.Element => {
	const {title, question, answers, orderNumber, type, id} = quiz;
	const {control, handleSubmit} = useForm();
	const { saveUserAnswer, openModal } = useActions();

	const handleSaveUserAnswer = (formData) => {
		if (!formData.message) return;

		const answer = {
			orderNumber,
			quizId: id,
			quizType: type,
			message: formData.message
		};

		openModal({
			actionFunc: () => saveUserAnswer(id, answer),
			actionButtonName: 'Save answer',
			modalQuestion: 'Do you want to save your answer?'
		});
	};

	return (
		<Card className={cn(styles.ta, styles.questionWrapper)}>
			<HTag size="l" className={styles.questionTitle}>{title}</HTag>
			<div className={styles.question}>{parse(question)}</div>
			<HR color="gray" className={styles.hr}/>
			<form className={styles.info} onSubmit={handleSubmit(handleSaveUserAnswer)}>
				<div className={styles.answerToTA}>
					<Controller
						name="message"
						control={control}
						render={({field: {onChange}}) => (
							<Editor
								label={'Your answer:'}
								className={styles.editor}
								onChange={onChange}
								placeholder="Type a question you want to ask..."
							/>
						)}
					/>
				</div>
				<HTag size="s" className={styles.allAnswers}>Answers:&nbsp;{answers.length}</HTag>
				<div>
					<Button color="primary" type="submit">Save answer</Button>
				</div>
			</form>
		</Card>
	);
});

toTemplates<any>(QuizzesTypes.ra, ({quiz}): JSX.Element => {
	const {title, question, answers, variants, type, id, orderNumber} = quiz;
	const {value: mark, range, getEstimationElement} = useEstimation({});
	const { saveUserAnswer, openModal } = useActions();

	const handleSaveUserAnswer = () => {
		if (!range || !mark) return;

		const answer = {
			orderNumber,
			quizId: id,
			quizType: type,
			rating: {
				rate: mark,
				scale: range
			}
		};

		openModal({
			actionFunc: () => saveUserAnswer(id, answer),
			actionButtonName: 'Save answer',
			modalQuestion: 'Do you want to save your answer?'
		});
	}

	const buildImages = () => {
		return <div className={styles.images}>
			{
				variants.map(({image, id}) => {
					return <Image
						key={id}
						src={image.imageUrl}
						effect="blur"
						text="Loading..."
						fully={true}
					/>
				})
			}
		</div>;
	};

	return (
		<Card className={cn(styles.ra, styles.questionWrapper)}>
			<HTag size="m" className={styles.questionTitle}>{title}</HTag>
			{question ? <div className={styles.question}>{parse(question)}</div> : <></>}
			{buildImages()}
			<HR color="gray" className={styles.hr}/>
			<div className={styles.answerWrapper}>
				{getEstimationElement()}
				<HTag size="s" className={styles.allAnswers}>Answers:&nbsp;{answers.length}</HTag>
				<Button color='primary' style={{marginRight: '15px'}} onClick={handleSaveUserAnswer}>Save mark</Button>
				<span className={styles.mark}>You mark:&nbsp;{mark}</span>
			</div>
		</Card>
	)
});

toTemplates<any>(QuizzesTypes.ab, ({quiz}): JSX.Element => {
	const {title, question, answers, variants, type, id, orderNumber} = quiz;
	const [selected, setSelected] = useState<string>(null);
	const { saveUserAnswer, openModal } = useActions();

	const handleSaveUserAnswer = () => {
		if (!selected) return;

		const answer = {
			orderNumber,
			quizId: id,
			quizType: type,
			variantId: selected,
			answer: variants.find(variant => variant.id === selected)
		};

		openModal({
			actionFunc: () => saveUserAnswer(id, answer),
			actionButtonName: 'Save answer',
			modalQuestion: 'Do you want to save your answer?'
		});
	};

	const buildImages = () => {
		return <div className={styles.images}>
			{
				variants.map(({image, id}) => {
					return <Image
						onClick={() => setSelected(id)}
						key={id}
						src={image.imageUrl}
						effect="blur"
						text="Loading..."
						fully={true}
					/>
				})
			}
		</div>;
	};

	return (
		<Card className={cn(styles.ab, styles.questionWrapper)}>
			<HTag size="m" className={styles.questionTitle}>{title}</HTag>
			<div className={styles.question}>{parse(question)}</div>
			{buildImages()}
			<HR color="gray" className={styles.hr}/>
			<div className={styles.info}>
				<HTag size="s" className={styles.allAnswers}>Answers:&nbsp;{answers.length}</HTag>
				{/*{(selected === 0 || selected) &&*/}
				<Button className={styles.reset} onClick={() => setSelected(null)}>Reset</Button>
				<Button color="primary" onClick={handleSaveUserAnswer}>Save answer</Button>
				{selected ?
					<span>Your answer: the {variants.findIndex(v => v.id === selected) === 0 ? 'first' : 'second'} image</span> : <></>}
			</div>
		</Card>
	);
});

export const QuizTemplate = (quizType: string, props: any) => getTemplate(quizType, props);