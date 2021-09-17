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

const questionTypesWithDescription: Array<[QuestionTypes, string, string]> = [
  [QuestionTypes.SA, 'Select Question', 'User can choose one of the answers that you provide'], 
  [QuestionTypes.TA, 'Text Question', 'User can answer using a text editor'], 
  [QuestionTypes.RA, 'Rating Question', ' User can estimate your image or a qustion from 1 to 10 points'], 
  [QuestionTypes.AB, 'A/B Question', 'User can choose only one of two answers']
];

const Create: FC<CreateProps> = (): JSX.Element => {
  const { error, clearError, request, loading} = useRequest();
  const { setAppAlert } = useActions();
  const { control, handleSubmit, setValue } = useForm();
  const { getValue, clearValue, onChange } = useInput();
  const [selectedType, setSelectedType] = useState<QuestionTypes | null>(null);
  const [questionAnswers, setQuestionAnswers] = useState<string[]>([]);
  const [content] = useState<string>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const history = useHistory();

  const handleAnswerAdd = (type: QuestionTypes): void => {
    const value = getValue(type).trim();
    if (value) {
      QuestionTypes.SA && setQuestionAnswers([...questionAnswers, value]);
      clearValue(type);
    }
  };

  const handleQuestionCreation = async (formData) => {
    const body: any = {};
    Object.keys(QuestionTypes).forEach(key => {
      if (formData[key + '_editor']) {
        body.question = stateToHTML(formData[key + '_editor'].getCurrentContent());
      }
    });
    body.content = getValue(selectedType + '_content');
    body.type = selectedType;
    body.title = getValue(selectedType + '_title');
    body.questionAnswers = questionAnswers;
    try {
      const data: any = await request(routes.QUIZES.CREATE, 'POST', body, {});
      setAppAlert(data.message, statuses.SUCCESS);
      handleResetForm();
      history.push(routes.QUIZES.TYPES[selectedType]);
    } catch (err) {
      setAppAlert(err.message, statuses.ERROR);
      clearError();
    }
  };

  const handleResetForm = () => {
    if (!selectedType) return;
    setQuestionAnswers([]);
    clearValue(selectedType);
    setValue(selectedType + '_editor', EditorState.createEmpty());
    setSelectedType(null);
  };

  const buildQuesionCreatorAccordingToType = (): JSX.Element => {
    if (!selectedType) return <></>;
    const handleAnswerDelete = (index: number) => {
      setQuestionAnswers(questionAnswers.filter((item, i) => i !== index));
    };
    switch (selectedType) {
      case QuestionTypes.SA: {
        return (
          <>
            <HTag size="m" className={styles.writeQuestionTitle}>Write your question:</HTag>
            <Controller
              name={selectedType + '_editor'}
              control={control}
              render={({ field: {value, onChange} }) => (
                <Editor placeholder="Type a question you want to ask..." editorState={value} onEditorStateChange={onChange}/>
              )}
            />
            <div className={styles.saAnswers}>
              <div className={styles.addAnswer}>
                <Input
                  label="Write an answer to your question:"
                  name={selectedType}
                  type="text"
                  placeholder="Write an answer variant to your question"
                  value={getValue(selectedType)}
                  onChange={onChange}
                />
                <Button
                  onClick={() => handleAnswerAdd(selectedType)}
                >Add</Button>
              </div>
              {questionAnswers && questionAnswers.length ? <HTag size="m" className={styles.suggested}>Suggested answers:</HTag> : <></>}
              {questionAnswers && questionAnswers.length ? <List list={questionAnswers} className={styles.list} onClose={handleAnswerDelete}/> : <></>}
            </div>
          </>
        );
      }
      case QuestionTypes.TA:
        return (
          <>
            <HTag size="m" className={styles.writeQuestionTitle}>Write your question:</HTag>
            <Controller
              name={selectedType + '_editor'}
              control={control}
              render={({ field: {value, onChange} }) => (
                <Editor placeholder="Type a question you want to ask..." editorState={value} onEditorStateChange={onChange}/>
              )}
            />
          </>
        );
      case QuestionTypes.RA:
        return (
          <>
            <HTag size="m" className={styles.writeQuestionTitle}>Write your question:</HTag>
            <Controller
              name={selectedType + '_editor'}
              control={control}
              render={({ field: {value, onChange} }) => (
                <Editor placeholder="Type a question you want to ask..." editorState={value} onEditorStateChange={onChange}/>
              )}
            />
            <Input
              label="Or just paste the image URL that you want to be estimated:"
              name={selectedType + '_content'}
              type="text"
              placeholder="Paste an URL of an image..."
              value={getValue(selectedType + '_content')}
              onChange={onChange}
            />
          </>
        );
      case QuestionTypes.AB:
        return (
          <>
            <HTag size="m" className={styles.writeQuestionTitle}>Write your question:</HTag>
            <Controller
              name={selectedType + '_editor'}
              control={control}
              render={({ field: {value, onChange} }) => (
                <Editor placeholder="Type a question you want to ask..." editorState={value} onEditorStateChange={onChange}/>
              )}
            />
            <div className={styles.saAnswers}>
              <div className={styles.addAnswer}>
                <Input
                  label="Write 2 answers for your question or paste 2 URLs to the images that you want to compare"
                  name={selectedType}
                  type="text"
                  placeholder="Write an answer variant to your question"
                  value={getValue(selectedType)}
                  onChange={onChange}
                />
                <Button
                  disabled={questionAnswers.length > 2}
                  onClick={() => handleAnswerAdd(selectedType)}
                >Add</Button>
              </div>
              {questionAnswers && questionAnswers.length ? <HTag size="m" className={styles.suggested}>Suggested answers:</HTag> : <></>}
              {questionAnswers && questionAnswers.length ? <List list={questionAnswers} className={styles.list} onClose={handleAnswerDelete}/> : <></>}
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
                name={selectedType + '_title'}
                value={getValue(selectedType + '_title')}
                onChange={onChange}
                placeholder="Write title of your question..."
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