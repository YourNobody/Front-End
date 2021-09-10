import React, { FC, useState } from 'react';
import { CreateProps } from './Create.props';
import styles from './Create.module.css';
import { withMainLayout } from '../../layouts/MainLayout/MainLayout';
import { Card, Button, HTag, HR, Editor, Tagger, Input, List } from '../../components/index';
import { QuestionTypes } from '../../interfaces/quizes.interface';
import { useInput } from './../../hooks/useInput.hook';
import cn from 'classnames';

const questionTypesWithDescription: Array<[QuestionTypes, string, string]> = [
  [QuestionTypes.SA, 'Select Question', 'User can choose one of the answers that you provide'], 
  [QuestionTypes.TA, 'Text Question', 'User can answer using a text editor'], 
  [QuestionTypes.RA, 'Rating Question', ' User can estimate your image or a qustion from 1 to 10 points'], 
  [QuestionTypes.AB, 'A/B Question', 'User can choose only one of two answers']
];

const Create: FC<CreateProps> = (): JSX.Element => {
  const { getValue, clearValue, onChange } = useInput();
  const [selectedType, setSelectedType] = useState<QuestionTypes | null>(null);
  const [saAnswers, setSaAnswers] = useState<string[]>([]);

  const handleAnswerAdd = (type: QuestionTypes): void => {
    const value = getValue(type).trim();
    if (value) {
      setSaAnswers([...saAnswers, getValue(type)]);
      clearValue(type);
    }
  };

  const buildQuesionCreatorAccordingToType = (): JSX.Element => {
    if (!selectedType) return <></>;
    switch (selectedType) {
      case QuestionTypes.SA:
        return (
          <>
            <Editor placeholder="Type a question you want to ask..."/>
            <div className={styles.saAnswers}>
              <div className={styles.addAnswer}>
                <Input
                  label="Type an answer to your question"
                  name={QuestionTypes.SA}
                  type="text"
                  value={getValue(QuestionTypes.SA)}
                  onChange={onChange}
                />
                <Button
                  color="primary"
                  onClick={() => handleAnswerAdd(QuestionTypes.SA)}
                >Add</Button>
              </div>
              <HTag size="m" className={styles.suggested}>Suggested answers:</HTag>
              <List list={saAnswers} className={styles.list}/>
            </div>
          </>
        );
      case QuestionTypes.TA:
        return (
          <></>
        );
      case QuestionTypes.RA:
        return (
          <></>
        );
      case QuestionTypes.AB:
        return (
          <></>
        );
      default: return <></>;
    }
  };
  return (
    <div className={styles.createPage}>
      <HTag size="l" className={styles.createPageTitle}>Create a question!</HTag>
      <Card>
        <div className={styles.selecType}>
          <HTag size="m">Select your a type of a question:</HTag>
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
                    <p>Description:&nbsp;{type[2]}</p>
                  </Tagger>
                );
              })
            }
          </div>
        </div>
        {buildQuesionCreatorAccordingToType()}
      </Card>
    </div>
  );
};

export default withMainLayout(Create);