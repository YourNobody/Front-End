import React, {FC, useEffect, useRef, useState} from 'react';
import {CreateProps} from './Create.props';
import styles from './Create.module.scss';
import {withMainLayout} from '../../layouts/MainLayout/MainLayout';
import {Button, Card, Editor, HR, HTag, Image, Input} from '../../components/index';
import {QuizzesTypes} from '../../interfaces/quizes.interface';
import {useActions} from '../../hooks/useActions.hook';
import {useHistory} from 'react-router';
import {useTypedSelector} from '../../hooks/useTypedSelector.hook'
import {Controller, useFieldArray, useForm, UseFormReturn} from "react-hook-form";
import {addClassValidationResolver, Quiz} from "../../helpers/addValidationResolver.helper";
import {useParams} from "react-router-dom";
import {routes, statuses} from "@Constants";

const QuizResolver = addClassValidationResolver<Quiz>(Quiz);

const quizzesTypesWithDescription: any = {
	[QuizzesTypes.sa]: {
		title: 'Select Quiz',
		description: 'User can choose one of the answers that you provide'
	},
	[QuizzesTypes.ta]: {
		title: 'Text Quiz',
		description: 'User can answer using a text editor'
	},
	[QuizzesTypes.ra]: {
		title: 'Rating Quiz',
		description: 'User can estimate your image or a quiz from 1 to 10 points'
	},
	[QuizzesTypes.ab]: {
		title: 'A/B Quiz',
		description: 'User can choose only one of two answers'
	}
};

const acceptedFiles = ".jpg,.png,.jpeg";

//questionAnswers
const Create: FC<CreateProps> = (): JSX.Element => {
	const {createQuiz, openModal} = useActions();
	const {loading} = useTypedSelector(state => state.quiz);
	const history = useHistory();
	const formState = useForm<Quiz>({resolver: QuizResolver});
	const {control, register, setValue, reset, getValues, handleSubmit, formState: {errors, dirtyFields}} = formState;
	const {qType} = useParams<{ qType: string }>();
	const inputAddQuizPreview = useRef<HTMLInputElement>(null);
	const [a, setA] = useState<string>(null);

	useEffect(() => {
	}, [history])

	const handleQuizCreation = (formData) => {
		const callbackAfter = () => {
			history.push(routes.QUIZZES.ROOT);
			reset();
		};

		openModal({
			actionFunc: () => createQuiz(Object.assign(formData, {type: qType}), callbackAfter),
			actionButtonName: 'Create',
			closeButtonName: 'No',
			modalQuestion: 'Do you really want to create a QuizSA?'
		});
	}

	const handleAddQuizAvatar = (e: any) => {
		if (!e.target && !e.target.files) return;
		const reader = new FileReader();

		reader.readAsDataURL(e.target.files[0]);

		reader.onload = ev => {
			setValue('quizAvatar', ev.target.result.toString());
			setA(ev.target.result.toString());
		};
	}

	return (
		<div className={styles.createPage}>
			<HTag size="l" className={styles.createPageTitle}>Create {quizzesTypesWithDescription[qType].title}!</HTag>
			<Card>
				<form onSubmit={handleSubmit(handleQuizCreation)}>
					<HTag size="large">{quizzesTypesWithDescription[qType].title}</HTag>
					<HTag size="small">{quizzesTypesWithDescription[qType].description}</HTag>
					<Input
						{...register('title')}
						hasValue={dirtyFields.title}
						error={errors.title}
						label="QuizSA Title:"
						type="text"
						placeholder="Write the quiz title..."
					/>
					<Controller
						name="question"
						control={control}
						render={({field: {onChange}}) => (
							<Editor
								label={'Question for a quiz:'}
								className={styles.editor}
								onChange={onChange}
								placeholder="Type a question you want to ask..."
							/>
						)}
					/>
					<Input type="file" ref={inputAddQuizPreview} onChange={handleAddQuizAvatar}/>
					<Button onClick={() => inputAddQuizPreview.current.click()} style={{marginTop: '10px'}}>Add quiz preview
						image</Button>
					<div>
						Preview:
						<Image src={a} style={{display: !a && 'none', maxHeight: '150px'}}/>
					</div>
					{
						returnQuizTemplate(qType, formState)
					}
					<HR className={styles.mainHr}/>
					<div className={styles.actions}>
						<Button className={styles.reset} color="danger">Reset</Button>
						<Button color="primary" className={styles.create} type="submit">Create</Button>
					</div>
				</form>
			</Card>
		</div>
	);
};

const templates = {} as Record<string, (useFormState: UseFormReturn<Quiz>) => JSX.Element>;

templates.QuizTemplateSA = (useFormState) => {
	const {setAppAlert} = useActions();
	const {register, control, setValue, watch, getValues, formState: {errors}} = useFormState;
	// @ts-ignore
	const {fields, prepend, remove} = useFieldArray<Quiz, 'variants', 'variantId'>({
		control, name: 'variants', keyName: 'variantId'
	})

	const answerPrepend = () => {
		if (fields.length > 10) return setAppAlert(`It's not possible to add more than 10 variants to one quiz`, statuses.WARNING);

		prepend({variantId: fields.length});
		setValue('variants', getValues('variants').map(val => {
			return JSON.stringify({}) === JSON.stringify(val) ? '' : Object.values(val).join('');
		}));
	};

	return <>
		<div className={styles.saAnswers}>
			<Input
				className={styles.checkbox}
				type="checkbox"
				label="Click if you want to have several answers to your quiz:"
				{...register('multiple')}
			/>
			<div className={styles.addAnswer}>
				<Button onClick={() => answerPrepend()}>Add answer to your quiz</Button>
				{
					fields.map(({variantId}, index) =>
						<div className={styles.newAnswer} key={index}>
							<span>{fields.length - index}</span>
							<Input
								{...(register(`variants.${index}` as const))}
								type="text"
								placeholder="Write answer"
							/>
							<Button color="danger" onClick={() => remove(index)}>&#215;</Button>
						</div>
					)
				}
			</div>
		</div>
	</>;
};

templates.QuizTemplateTA = (useFormState): JSX.Element => {
	const {register, handleSubmit, reset, formState: {errors}} = useFormState;

	return <></>;
};

templates.QuizTemplateRA = (useFormState): JSX.Element => {
	const {setAppAlert} = useActions();
	const {control, register, formState: {errors}} = useFormState;
	const {fields, append, remove} = useFieldArray<any, 'images', 'imageId' | 'imageBase64' | 'name' | 'size' | 'type'>({
		name: 'images', keyName: 'imageId', control
	})
	const ref = useRef<HTMLInputElement>(null);

	async function check(e: any, append: (params: any) => void) {
		if (!e.target || !e.target.files.length) return;

		const imagesNames = fields.map(field => field.name);
		const files = [...e.target.files].filter(file => file.type.split('/')[0] === 'image' && !imagesNames.includes(file.name));

		if (fields.length > 8 || files.length > 8 || files.length + fields.length > 8)
			return setAppAlert(`It's not possible to add more than 8 images`, statuses.WARNING);

		const promises = files.map(file => {
			const reader = new FileReader();
			return new Promise(res => {
				const {name, size, type} = file;
				reader.readAsDataURL(file);

				reader.onload = ev => {
					res(ev.target.result);
					append({
						name, size, type,
						imageBase64: ev.target.result,
						imageId: type + size + name
					});
				};
			})
		});

		const result = await (Promise as any).allSettled(promises)
	}

	return <>
		<div className={styles.addAnswer}>
			<div className={styles.addAnswerLeft}>
				<Button color="ghost" onClick={() => ref.current.click()}>Add images to be rated</Button>
				<Input
					name="img"
					accept={acceptedFiles}
					type="file"
					onChange={(e) => check(e, append)}
					ref={ref}
					multiple={true}
				/>
			</div>
			<div className={styles.imagesContainer}>
				{
					fields.map(({name, imageBase64, imageId}, index) =>
						<div key={imageId}>
							<Image
								src={imageBase64}
								className={styles.image}
							/>
							<Button className={styles.imageRemove} color="danger" onClick={() => remove(index)}>&times;</Button>
							<div className={styles.imageName}>{name}</div>
						</div>
					)
				}
			</div>
		</div>
	</>;
};

templates.QuizTemplateAB = (useFormState): JSX.Element => {
	const {control, register, handleSubmit, reset, formState: {errors}} = useFormState;
	const {setAppAlert} = useActions();
	const {fields, append, remove} = useFieldArray<any, 'images', 'imageId' | 'imageBase64' | 'name' | 'size' | 'type'>({
		name: 'images', keyName: 'imageId', control
	})
	const ref = useRef<HTMLInputElement>(null);

	async function check(e: any, append: (params: any) => void) {
		if (!e.target || !e.target.files.length) return;
		const files = [...e.target.files].filter(file => file.type.split('/')[0] === 'image');

		if (fields.length > 8 || files.length > 8 || files.length + fields.length > 8)
			return setAppAlert(`It's not possible to add more than 2 images`, statuses.WARNING);

		const promises = files.map(file => {
			const reader = new FileReader();
			return new Promise(res => {
				const {name, size, type} = file;
				reader.readAsDataURL(file);

				reader.onload = ev => {
					res(ev.target.result);
					append({
						name, size, type,
						imageBase64: ev.target.result,
						imageId: file.name
					});
				};
			})
		});

		const result = await (Promise as any).allSettled(promises)
	}

	return <>
		<div className={styles.saAnswers}>
			<div className={styles.addAnswer}>
				<div className={styles.addAnswerRight}>
					<Button color="ghost" onClick={() => ref.current.click()} style={{marginRight: '20px'}}>Загрузить
						изображение</Button>
					<Button color="danger" onClick={() => {
					}}>Remove all</Button>
				</div>
				<div className={styles.imagesContainer}>
					{
						fields.map(({name, imageBase64, imageId}, index) =>
							<div key={imageId}>
								<Image
									src={imageBase64}
									className={styles.image}
								/>
								<Button className={styles.imageRemove} color="danger" onClick={() => remove(index)}>&times;</Button>
								<div className={styles.imageName}>{name}</div>
							</div>
						)
					}
				</div>
				<Input
					name="img"
					accept={acceptedFiles}
					type="file"
					onChange={(e) => check(e, append)}
					ref={ref}
					multiple={true}
				/>
			</div>
		</div>
	</>;
};

function returnQuizTemplate(quizType: string, useFormState: UseFormReturn<Quiz>): JSX.Element {
	return templates['QuizTemplate' + quizType.toUpperCase()](useFormState);
}

export default withMainLayout(Create);