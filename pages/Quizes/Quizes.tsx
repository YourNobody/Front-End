import { FC, useState } from 'react';
import { QuizesProps } from './Quizes.props';
import styles from './Quizes.module.css';
import { withMainLayout } from '../../layouts/MainLayout/MainLayout';
import cn from 'classnames';
import { Card, Image, HTag } from '../../components';
import { AB_Question, SA_Question, RA_Question, TA_Question } from './Questions/index';
import { Link, Route, useLocation, useParams } from 'react-router-dom';
import { routes } from './../../constants/routes';
import { QuestionParamsTypes, QuestionTypes } from '../../interfaces/quizes.interface';
import { quizesData } from '../../constants/data';
import { useTypedSelector } from './../../hooks/useTypedSelector.hook';
import URL from '../../src/assets/quiz-page/ra.jfif';

const Question: FC<any> = () => {
  const { qType } = useParams<QuestionParamsTypes>();
  
  switch (qType.toUpperCase()) {
    case 'SA': return <SA_Question
      question="How are you?"
      answers={['I\'m finfwfwefewfewfewfewfewfewfwv2324325432g2g42tg2vresbnhrwbtj4hrnyefwefewfe', 'Bad', 'It goeswefewfewewfewfewfewfewewfewfewfwefewf well','I\'m fine', 'Bad', 'It goes well','I\'m fine', 'Bad', 'It goes well','I\'m fine', 'Bad', 'It goes well','I\'m fine', 'Bad', 'It goes well','I\'m fine', 'Bad', 'It goes well','I\'m fine', 'Bad', 'It goes well','I\'m fine', 'Bad', 'It goes well']}
    />;
    case 'TA': return <TA_Question/>;
    case 'RA': return <RA_Question target="image" content={URL}/>;
    case 'AB': return <AB_Question question="How are you?" answers={['fine', 'very bad']}/>;
    default: return <></>;
  }
};

export const Quizes = ({ className, ...props }: QuizesProps): JSX.Element => {
  const { pathname } = useLocation();

  const user = useTypedSelector(state => state.user.user);

  const [selected, setSelected] = useState<QuestionTypes>(null);

  const handleCardClick = (type) => {
    setSelected(type);
  };

  const buildQuizes = (): JSX.Element[] => {
    return quizesData.map((item) => {
      return (
        <Link 
          to={routes.QUIZES.TYPES[item.type]}
          onClick={() => handleCardClick(item.type)}
          key={item.type}
        >
          <Card className={cn(styles.card, {
            [styles.selected]: selected === item.type
          })} data-target="card">
            <HTag className={styles.title}>{item.title}</HTag>
            <p className={styles.description}>{item.description}</p>
            <Image src={item.src} text="Select Questions" fit="cover" className={styles.image}/>
          </Card>
        </Link>
      );
    }) || [<></>];
  };

  return (
    <div {...props}
      className={cn(styles.quizPage, className, {
        [styles.choosen]: pathname !== routes.QUIZES.ROOT,
      })}
    >
      <Route path={routes.QUIZES.ROOT}>
          {buildQuizes()}
      </Route>
      <Route path={routes.QUIZES.ROOT + '/:qType'}>
        <div className={styles.allWrapper}>
          <Question />
          <Question />
          <Question />
          <Question />
          <Question />
        </div>
      </Route>
    </div>
  );
};

export default withMainLayout(Quizes);