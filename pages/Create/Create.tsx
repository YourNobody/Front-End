import React, { FC, useRef, useState } from 'react';
import { CreateProps } from './Create.props';
import styles from './Create.module.css';
import { withMainLayout } from '../../layouts/MainLayout/MainLayout';
import { Card, Button, HTag, HR, Editor, Tagger, Input, List } from '../../components/index';
import { QuestionTypes } from '../../interfaces/quizes.interface';
import { useInput } from './../../hooks/useInput.hook';
import cn from 'classnames';
import { Controller, useForm } from 'react-hook-form';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { useRequest } from '../../hooks/useRequest';
import { useActions } from '../../hooks/useActions.hook';
import { statuses } from '../../constants/app';
import { useHistory } from 'react-router';
import { routes } from '../../constants/routes';
import { LOCALSTORAGE_USER_DATA_NAME } from './../../constants/app';

const questionTypesWithDescription: Array<[QuestionTypes, string, string]> = [
  [QuestionTypes.SA, 'Select Question', 'User can choose one of the answers that you provide'], 
  [QuestionTypes.TA, 'Text Question', 'User can answer using a text editor'], 
  [QuestionTypes.RA, 'Rating Question', ' User can estimate your image or a qustion from 1 to 10 points'], 
  [QuestionTypes.AB, 'A/B Question', 'User can choose only one of two answers']
];

//questionAnswers
const Create: FC<CreateProps> = (): JSX.Element => {
  const { error, clearError, request, loading} = useRequest();
  const { setAppAlert } = useActions();
  const { control, setValue } = useForm();
  const { register, clearValues, handleSubmit, getValues } = useInput();
  const [allEditorState, setAllEditorState] = useState({});
  const [selectedType, setSelectedType] = useState<QuestionTypes | null>(null);
  const [questionAnswers, setQuestionAnswers] = useState<Record<QuestionTypes, string[]>>({} as Record<QuestionTypes, string[]>);
  const formRef = useRef<HTMLFormElement>(null);
  const history = useHistory();

  const handleAnswerAdd = (): void => {
    const type = selectedType.toLowerCase();
    let value = getValues(type + '_answer') as string;

    value = value.trim();
    if (value && questionAnswers[type] && questionAnswers[type].find(a => a === value)) {
      clearValues(type + '_answer');
      return;
    }
    if (value && type) {
      if (!questionAnswers[type]) {
        setQuestionAnswers({
          ...questionAnswers,
          [type]: [value]
        });  
      } else {
        setQuestionAnswers({
          ...questionAnswers,
          [type]: [value, ...questionAnswers[type]]
        });
      }
      clearValues(type + '_answer');
    }
  };

  const handleAnswerDelete = (index: number) => {
    const type = selectedType.toLowerCase();
    setQuestionAnswers({
      ...questionAnswers,
      [type]: questionAnswers[type].filter((item, i) => i !== index)
    });
  };

  const handleQuestionCreation = async (formData) => {
    const body: any = {};
    const type = selectedType.toLowerCase();
    Object.keys(QuestionTypes).forEach(key => {
      if (formData[key + '_editor']) {
        body.question = stateToHTML(formData[key + '_editor'].getCurrentContent());
      }
    });
    body.type = type;
    body.title = getValues(type + '_title');
    body.quizAnswers = questionAnswers[type];

    const headers: Record<string, string> = {};
    if (localStorage.getItem(LOCALSTORAGE_USER_DATA_NAME)) {
      const { token } = JSON.parse(localStorage.getItem(LOCALSTORAGE_USER_DATA_NAME));
      headers.authorization = token ? token : null;
    }
    try {
      const data: any = await request(routes.QUIZES.CREATE, 'POST', body, headers);
      setAppAlert(data.message, statuses.SUCCESS);
      handleResetForm();
      history.push(routes.QUIZES.TYPES[type]);
    } catch (err) {
      setAppAlert(err.message, statuses.ERROR);
      clearError();
    }
  };

  const handleResetForm = () => {
    if (!selectedType) return;
    const type = selectedType.toLowerCase();
    setQuestionAnswers({
      ...questionAnswers,
      [type]: []
    });
    clearValues(selectedType);
    setValue(type + '_editor', EditorState.createEmpty());
    setSelectedType(null);
  };

  const addSuggestedAnswers = (): JSX.Element => {
    const type = selectedType ? selectedType.toLowerCase() : selectedType;
    return type && questionAnswers[type] && questionAnswers[type].length
      ? <>
        <HTag size="m" className={styles.suggested}>Suggested answers:</HTag>
        <List list={questionAnswers[type]} className={styles.list} onClose={handleAnswerDelete}/>
      </>
      : <></>;
  };

  const editorWithState = (name) => {
    // const [state, setState] = useState(EditorState.createEmpty());
    // setAllEditorState({
    //   ...allEditorState,
    //   [name]: EditorState.createEmpty();
    // })

    return <Editor placeholder="Type a question you want to ask..." editorState={EditorState.createEmpty()} onEditorStateChange={(a) => console.log(a)}/>;
  };

  const buildQuesionCreatorAccordingToType = (): JSX.Element => {
    if (!selectedType) return <></>;
    switch (selectedType) {
      case QuestionTypes.SA: {
        return (
          <>
            <HTag size="m" className={styles.writeQuestionTitle}>Write your question:</HTag>
            {editorWithState(selectedType + '_editor')}
            <div className={styles.saAnswers}>
              <div className={styles.addAnswer}>
                <Input
                  label="Write an answer to your question:"
                  type="text"
                  placeholder="Write an answer variant to your question"
                  {...register(selectedType + "_answer")}
                />
                <Button
                  onClick={handleAnswerAdd}
                >Add</Button>
              </div>
              {addSuggestedAnswers()}
            </div>
          </>
        );
      }
      case QuestionTypes.TA:
        return (
          <>
            <HTag size="m" className={styles.writeQuestionTitle}>Write your question:</HTag>
            {editorWithState(selectedType + '_editor')}
          </>
        );
      case QuestionTypes.RA:
        return (
          <>
            <HTag size="m" className={styles.writeQuestionTitle}>Write your question:</HTag>
            {editorWithState(selectedType + '_editor')}
            <div className={styles.addAnswer}>
              <Input
                label="Or just paste the image URL that you want to be estimated:"
                type="text"
                placeholder="Paste an URL of an image..."
                {...register(selectedType + '_answer')}
              />
              <Button
                disabled={questionAnswers[selectedType] && questionAnswers[selectedType].length >= 1}
                onClick={handleAnswerAdd}
              >Add</Button>
            </div>
            {addSuggestedAnswers()}
          </>
        );
      case QuestionTypes.AB:
        return (
          <>
            <HTag size="m" className={styles.writeQuestionTitle}>Write your question:</HTag>
            {editorWithState(selectedType + '_editor')}
            <div className={styles.saAnswers}>
              <div className={styles.addAnswer}>
                <Input
                  label="Write 2 answers for your question or paste 2 URLs to the images that you want to compare"
                  type="text"
                  placeholder="Write an answer variant to your question"
                  {...register(selectedType + '_answer')}
                />
                <Button
                  disabled={questionAnswers[selectedType] && questionAnswers[selectedType].length >= 2}
                  onClick={handleAnswerAdd}
                >Add</Button>
              </div>
              {addSuggestedAnswers()}
            </div>
          </>
        );
      default: return <></>;
    }
  };
  return (
    <div className={styles.createPage}>
      <HTag size="l" className={styles.createPageTitle}>Create Quiz!</HTag>
      <Card>
        <form onSubmit={handleSubmit(handleQuestionCreation)} ref={formRef}>
          <div className={styles.selecType}>
            <HTag size="m" className={styles.selectTypeTitle}>Select your a type of a Quiz:</HTag>
            <div className={styles.types}>
              {
                questionTypesWithDescription.map(type => {
                  return (
                    <Tagger
                      key={type[0]}
                      onClick={() => setSelectedType(type[0])}
                      className={cn(styles.tagger, {
                        [styles.selectedType]: selectedType === type[0],
                        [styles.unselectedType]: selectedType !== type[0] && selectedType !== null
                      })}>
                      <HTag size="s">Type:&nbsp;{type[1]}</HTag>
                      <p style={{paddingTop: '5px'}}>Description:&nbsp;{type[2]}</p>
                    </Tagger>
                  );
                })
              }
            </div>
          </div>
          {selectedType ? <>
              <Input
                label="Quiz Title:"
                className={styles.inputTitle}
                type="text"
                placeholder="Write title of your question..."
                {...register(selectedType + '_title')}
              />
            </> : <></>
          }
          {buildQuesionCreatorAccordingToType()}
          <HR className={styles.mainHr}/>
          <div className={styles.actions}>
            <Button className={styles.reset} onClick={handleResetForm}>Reset</Button>
            <Button color="primary" className={styles.create} type="submit">Create</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default withMainLayout(Create);