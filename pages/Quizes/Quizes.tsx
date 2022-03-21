import { FC, useEffect, useState, MouseEvent } from 'react';
import { QuizesProps } from './Quizes.props';
import styles from './Quizes.module.css';
import { withMainLayout } from '../../layouts/MainLayout/MainLayout';
import cn from 'classnames';
import { Card, Image, HTag, Button } from '../../components';
import { Link, Route, useHistory, useLocation } from 'react-router-dom';
import { routes } from './../../constants/routes';
import { quizesData } from '../../constants/data';
import { useActions } from './../../hooks/useActions.hook';
import { quizesNames } from '../../../Back-End/src/constants/app';
import { useTypedSelector } from '../../hooks/useTypedSelector.hook';
import Dotes from  '../../src/assets/icons/dotes.svg';

export const Quizes: FC<QuizesProps> = ({ className, ...props }) => {
  const { user: { accessToken }, quiz: { allSelectedQuizzes, loading } } = useTypedSelector(state => state);
  const { setSelectedQuiz } = useActions();
  const { pathname } = useLocation();
  let alreadySelected: any = null;

  if (Object.values(routes.QUIZZES.TYPES).includes(pathname)) {
    const pathSplitted = pathname.split('/');
    if (pathSplitted.length && quizesNames[pathSplitted[pathSplitted.length - 1].toUpperCase()]) {
      alreadySelected = pathSplitted[pathSplitted.length - 1].toUpperCase();
    }
  }

  const history = useHistory();
  const { getQuizzes } = useActions();
  const [selectedType, setSelectedType] = useState<any>(alreadySelected);
  const [wrapped, setWrapped] = useState<boolean>(false);
  const [selectedOptionsType, setSelectedOptionsType] = useState<any>(null);

  useEffect(() => {
    selectedType && getQuizzes(selectedType);
  }, [selectedType, accessToken]);

  const generateRouteAndRedirect = (quiz: any) => {
    const titled = quiz.title.toLowerCase().replace(/\s/ig, '-');
    setSelectedQuiz(quiz);
    history.push(routes.QUIZZES.ROOT + `/${quiz.type}/${quiz.orderNumber}/${titled}`);
  };

  const handleCardClick = (type: string) => {
    setSelectedType(type);
    history.push(routes.QUIZZES.ROOT + `/${type}`);
    setWrapped(true);
  };

  const handleOptionsCLick = (event: MouseEvent<HTMLDivElement>, type) => {
    event.stopPropagation();
    if (selectedOptionsType === type) setSelectedOptionsType(null);
    else setSelectedOptionsType(type);
  };

  const buildQuizesTypes = (): JSX.Element[] => {
    return quizesData.map((item) => {
      return (
        <div
          key={item.type}
          className={cn(styles.link, {
            [styles.selectedCard]: wrapped
          })}
        >
          {!wrapped
            ? <Card
                className={cn(styles.card, {
                  [styles.selected]: selectedType === item.type
                })}
                data-target="card"
              >
                <div
                  className={cn(styles.dotes, {
                    [styles.active]: selectedOptionsType === item.type
                  })}
                  onClick={(e) => handleOptionsCLick(e, item.type)}
                >
                  <Dotes />
                </div>
                {
                  selectedOptionsType === item.type ? <div className={styles.dropDown}>
                    <Link to={routes.QUIZZES.ROOT + `/${selectedOptionsType}/create`}>Create your quiz</Link>
                    <Link to={routes.PROFILE.QUIZZES}>Show my quizzes</Link>
                  </div> : <></>
                }
                <HTag className={styles.title}>{item.title}</HTag>
                <p className={styles.description}>{item.description}</p>
                <Button onClick={() => handleCardClick(item.type)}>Show</Button>
              </Card>
            :
              <Card
                className={cn(styles.cardText, {
                  [styles.selectedCartExactly]: selectedType === item.type && wrapped
                })}
                data-target="card"
                onClick={() => handleCardClick(item.type)}
              >
                <HTag className={styles.title}>{item.title}</HTag>
              </Card>
          }
        </div>
      );
    }) || [<></>];
  };

  const buildQuizzes = (): JSX.Element | JSX.Element[] => {
    if (!allSelectedQuizzes) return <></>;
    if (allSelectedQuizzes.length) {
      return allSelectedQuizzes.filter(q => !!q.title).map(q => {
        return (
          <Card key={Math.random()} className={styles.quizLinkWrapper}>
            <HTag size="m" className={styles.quizTitle}>{q.title}</HTag>
            <div className={styles.quizInfo}>
              <Button
                color="primary"
                onClick={() => generateRouteAndRedirect(q)}
                className={styles.quizGoTo}
              >Go to Quiz</Button>
              <HTag size="s">Created:&nbsp;{q.createdAt}</HTag>
            </div>
          </Card>
        );
      });
    }
    return selectedType ? <Card><HTag style={{textAlign: 'center'}} size="m">No Quiz found</HTag></Card> : <></>;
  };

  return (
    <div {...props}
      className={cn(styles.quizPage, className, {
        [styles.wrapped]: wrapped
      })}
    >
      <Route path={routes.QUIZZES.ROOT}>
          {wrapped && <Button color="ghost" className={styles.buttonUnwrap} onClick={() => setWrapped(false)}>Click to unwrap</Button>}
          {buildQuizesTypes()}
      </Route>
      <Route path={routes.QUIZZES.ROOT + '/:qType'} exact>
        <div className={styles.allWrapper}>
          {loading && <Card><HTag size="m" style={{textAlign: 'center'}}>Loading...</HTag></Card>}
          {!loading && buildQuizzes()}
          {/*{*/}
          {/*  hasSubscription*/}
          {/*    ? !loading ? buildQuizzes() : <></>*/}
          {/*    : !loading*/}
          {/*      ? quizesData.find(q => q.type === selectedType && q.withSubscription)*/}
          {/*        ?*/}
          {/*          accessToken*/}
          {/*            ? <div>*/}
          {/*                <HTag size="m">This type of quizzes is available only if you have our <Link to={routes.PROFILE.SUBSCRIPTION}>subscription</Link></HTag>*/}
          {/*              </div>*/}
          {/*            : <div>*/}
          {/*                <HTag size="m">*/}
          {/*                  This type of quizzes is available only if you have our subscription*/}
          {/*                  <br/>*/}
          {/*                  <br/>*/}
          {/*                  But firstly you need t o <Link to={routes.AUTH.REGISTER}>register</Link> to our app*/}
          {/*                </HTag>*/}
          {/*              </div>*/}
          {/*        : buildQuizzes()*/}
          {/*      : <></>*/}
          {/*}*/}
        </div>
      </Route>
    </div>
  );
};

export default withMainLayout(Quizes);