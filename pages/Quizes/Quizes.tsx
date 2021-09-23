import { FC, useEffect, useState } from 'react';
import { QuizesProps } from './Quizes.props';
import styles from './Quizes.module.css';
import { withMainLayout } from '../../layouts/MainLayout/MainLayout';
import cn from 'classnames';
import { Card, Image, HTag, Button } from '../../components';
import { Link, Route, useHistory, useLocation } from 'react-router-dom';
import { routes } from './../../constants/routes';
import { QuestionTypes } from '../../interfaces/quizes.interface';
import { quizesData } from '../../constants/data';
import { useRequest } from '../../hooks/useRequest';
import { LOCALSTORAGE_QUIZ_DATA_NAME, statuses } from '../../constants/app';
import { useActions } from './../../hooks/useActions.hook';

export const Quizes: FC<QuizesProps> = ({ className, ...props }) => {
  const { pathname } = useLocation();
  let alreadySelected: QuestionTypes = null;
  if (Object.values(routes.QUIZES.TYPES).includes(pathname)) {
    const pathSplitted = pathname.split('/');
    if (pathSplitted.length) {
      alreadySelected = pathSplitted[pathSplitted.length - 1].toUpperCase() as QuestionTypes;
    }
  }

  const generateRouteAndRedirect = (quiz: any) => {
    const titled = quiz.title.toLowerCase().replace(/\s/ig, '-');
    localStorage.setItem(LOCALSTORAGE_QUIZ_DATA_NAME, JSON.stringify(quiz));
    history.push(routes.QUIZES.ROOT + `/${quiz.type.toLowerCase()}/${titled}`);
  };

  const history = useHistory();
  const { setAppAlert } = useActions();
  const { error, clearError, request, loading } = useRequest();
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState<QuestionTypes>(alreadySelected);
  const [wrapped, setWrapped] = useState<boolean>(!!selectedType);

  useEffect(() => {
    const realizingFetch = async () => {
      try {
        const data: any = await request(routes.QUIZES.ROOT, 'POST', { type: selectedType });
        console.log('data: ', data);
        
        setAppAlert(data.message, statuses.SUCCESS);
        setQuestions(data.quizes ? data.quizes : []);
      } catch (err) {
        setAppAlert(error, statuses.ERROR);
        clearError();
      }
    };

    selectedType && realizingFetch();
  }, [selectedType]);

  const handleCardClick = async (type: QuestionTypes) => {
    setSelectedType(type);
    setWrapped(true);
  };

  const buildQuizes = (): JSX.Element[] => {
    return quizesData.map((item) => {
      return (
        <Link 
          to={routes.QUIZES.TYPES[item.type]}
          onClick={() => handleCardClick(item.type)}
          key={item.type}
          className={cn(styles.link, {
            [styles.selectedCard]: wrapped
          })}
        >
          {!wrapped
            ? <Card className={cn(styles.card, {
                [styles.selected]: selectedType === item.type
              })} data-target="card" >
              <HTag className={styles.title}>{item.title}</HTag>
              <p className={styles.description}>{item.description}</p>
              <Image src={item.src} text={item.title} fit="cover" className={styles.image}/>
              </Card>
            : <Card className={cn(styles.cardText, {
                [styles.selectedCartExactly]: selectedType === item.type && wrapped
              })} data-target="card">
              <HTag className={styles.title}>{item.title}</HTag>
            </Card>
          }
        </Link>
      );
    }) || [<></>];
  };

  const buildQuestionsLinks = (): JSX.Element | JSX.Element[] => {
    if (!questions) return <></>;
    if (questions.length) {
      return questions.filter(q => !!q.title).map(q => {

        return (
          <Card key={Math.random()} className={styles.quizLinkWrapper}>
            <HTag size="m" className={styles.quizTitle}>{q.title}</HTag>
            <div className={styles.quizInfo}>
              <Button
                color="primary"
                onClick={() => generateRouteAndRedirect(q)}
                className={styles.quizGoTo}
              >Go to Quiz</Button>
              <HTag size="s">Creator:&nbsp;{q.creator.nickname}</HTag>
            </div>
          </Card>
        );
      });
    }
    return <HTag size="m">No questions of the selected type</HTag>;
  };

  return (
    <div {...props}
      className={cn(styles.quizPage, className, {
      })}
    >
      <Route path={routes.QUIZES.ROOT}>
          {buildQuizes()}
          {/* {wrapped && <Button color="ghost" className={styles.buttonUnwrap} onClick={() => setWrapped(false)}>&#5171;</Button>} */}
      </Route>
      <Route path={routes.QUIZES.ROOT + '/:qType'}>
        <div className={styles.allWrapper}>
          {loading ? <HTag size="m">Loading...</HTag> : <></>}
          {!loading ? buildQuestionsLinks() : <></>}
        </div>
      </Route>
    </div>
  );
};

export default withMainLayout(Quizes);