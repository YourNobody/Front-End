// import React, { FC, useCallback, useState } from 'react';
// import { AB_QuestionProps } from './AB_Question.props';
// import styles from './AB_Question.module.css';
// import { HTag, Button, HR, Card, Image } from '../../../components/index';
// import { checkForValideImageLink } from '../../../helpers/custom.helper';
// import parse from 'html-react-parser';
// import cn from 'classnames';
// import { IUserAnswer } from '../../../interfaces/quizes.interface'
//
// export const AB_Question: FC<AB_QuestionProps> = ({onSave, id, question, title, quizAnswers, usersAnswers, creator, ...props}) => {
//   const [selected, setSelected] = useState<number | null>(null);
//
//   const handleUserAnswerSave = async () => {
//     const body = {} as IUserAnswer & { quizAnswerId?: string, quizId: string };
//     body.quizId = id;
//     body.quizAnswerId = quizAnswers.find((_, index) => selected === index)?._id;
//     onSave(body);
//   };
//
//   const handleSelectedClick = (index: number | null) => {
//     setSelected(index);
//   };
//
//   const buildQuestionAnswers = (): JSX.Element[] => {
//     function classNameWithSelected(index: number, ...classNames: string[]) {
//       return cn(...classNames, {
//         [styles.selected]: selected === index,
//       });
//     }
//
//     function renderImages(type: 'text' | 'image'): JSX.Element[] {
//       return quizAnswers.map((answer: any, index) => {
//         if (type === 'text') return <Image
//           key={Math.random()}
//           onClick={() => handleSelectedClick(index)}
//           fully
//           text={answer.answer}
//           className={classNameWithSelected(index, styles.imageText)}
//         />;
//         if (type === 'image') return <Image
//           key={Math.random()}
//           onClick={() => handleSelectedClick(index)}
//           src={answer.answer}
//           className={classNameWithSelected(index, styles.image)}
//           fit="contain"
//         />;
//         return <></>;
//       });
//     }
//
//     let isImagesValid = true;
//     quizAnswers.forEach((answer: any) => {
//       if (!checkForValideImageLink(answer.answer)) isImagesValid = false;
//     });
//
//     if (isImagesValid) {
//       return renderImages('image');
//     } else {
//       return renderImages('text');
//     }
//   };
//
//   if (!question || quizAnswers.length < 2) return <></>;
//   return (
//     <Card className={styles.questionWrapper} {...props}>
//       <HTag size="m" className={styles.questionTitle}>{title}</HTag>
//       <div className={styles.question}>{parse(question)}</div>
//       <div className={styles.answersWrraper}>
//         {buildQuestionAnswers()}
//       </div>
//       <HR color="gray" className={styles.hr}/>
//       <div className={styles.info}>
//         <HTag size="s" className={styles.allAnswers}>Answers:&nbsp;{usersAnswers.length}</HTag>
//         {(selected === 0 || selected) && <Button className={styles.reset} onClick={() => handleSelectedClick(null)}>Reset</Button>}
//         <Button color="primary" onClick={handleUserAnswerSave}>Save answer</Button>
//       </div>
//     </Card>
//   );
// };