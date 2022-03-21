import {FC, useEffect, useRef, useState} from 'react';
import {QuizWithStatsBoilerplateProps} from './QuizStats.props';
import styles from './QuizStats.module.scss';
import {Button, Card, HTag, Input} from '@Components';
import {useActions} from '@Hooks';
import {changeStatisticsTooltipLabel, formatDate} from '@Helpers';
import './rechart.css';
import {useTypedSelector} from '@Hooks';
import {QuizesTypes} from "@Interfaces/quizes.interface";
import cn from "classnames";
import {Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import parse from "html-react-parser";

const QuizWithStatsBoilerplate: FC<QuizWithStatsBoilerplateProps> = ({ quizData, stats, ...props }) => {
  const [hidden, setHidden] = useState<boolean>(true);
  const { selfQuizzesWithStats: { loading } } = useTypedSelector(state => state.quiz);
  const { openModal, closeModal, deleteQuiz, getQuizWithStats } = useActions();
    
  const handleShowStats = async () => {
    setHidden(false);
    !stats && getQuizWithStats(quizData.orderNumber);
  };

  const handleRemoveQuiz = () => {
    openModal({
      actionFunc: () => deleteQuiz(quizData.id),
      actionButtonName: 'Delete',
      closeButtonName: 'No',
      modalQuestion: `Do you want to delete this quiz?\nTitle: ${quizData.title}\nType: ${quizData.type}`
    });
  };

  useEffect(() => {
  }, [quizData, stats]);

  if (!quizData) return <></>;

  const renderStatsAccordingToType = () => {
    if (!stats) return <></>;
    switch (quizData.type.toUpperCase()) {
      case QuizesTypes.SA: {
        return <div className={cn(styles.sa_stats, {
          [styles.hidden]: hidden
        })}>
          {
            loading ? <HTag size="m">Loading statistics...</HTag>
              :
              <>
                <HTag size="s">Answers: {quizData.answers.length}</HTag>
                <ResponsiveContainer width="90%" height="100%">
                  <ComposedChart
                    layout="vertical"
                    width={500}
                    height={400}
                    data={stats}
                    margin={{
                      top: 20,
                      right: 20,
                      bottom: 20,
                      left: 20,
                    }}
                  >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="count" type="number"/>
                    <YAxis dataKey="answer" type="category" scale="band"/>
                    <Legend />
                    <Tooltip separator="" formatter={(value, name, props) => changeStatisticsTooltipLabel(value, name, props)('answer', 'Amount')}/>
                    <Bar dataKey="count" barSize={15} fill="#413ea0"/>
                    <Line type="monotone" dataKey="count" stroke="#ff7300" tooltipType="none"/>
                  </ComposedChart>
                </ResponsiveContainer>
              </>
          }
        </div>
      }
      case QuizesTypes.TA: {
        return <div
          className={cn(styles.ta_stats, {
            [styles.hidden]: hidden
          })}
        >
          {
            stats.map(stat => {
              return <div className={styles.message} key={stat.createdAt}>
                <div className={styles.text}>{parse(stat.message)}</div>
                <div className={styles.date}>{formatDate(stat.createdAt)}</div>
              </div>
            })
          }
        </div>
      }
    }
  };

  return <Card
    {...props}
    className={styles.myCard}
  >
    <HTag size="m">Title: {quizData.title}</HTag>
    <HTag size="s" className={styles.typeQuziStat}>Type: {quizData.type}</HTag>
    <Button color="danger" className={styles.closeCard} onClick={handleRemoveQuiz}>&#215;</Button>
    <div className={styles.infoActions}>
      <HTag size="s">Created at: {formatDate(quizData.createdAt)}</HTag>
      {hidden && <Button color="ghost" onClick={() => handleShowStats()}>Show statistics</Button>}
      {!hidden && <Button color="primary" onClick={() => setHidden(true)}>Hide</Button>}
    </div>
      {renderStatsAccordingToType()}
  </Card>;
};

export const QuizStats: FC<any> = () => {
  const { getSelfQuizzes } = useActions();
  const { selfQuizzes, loading, selfQuizzesWithStats} = useTypedSelector(state => state.quiz);
  const [filteredQuizzes, setFilteredQuizzes] = useState<any[]>([]);

  useEffect(() => {
    if (!selfQuizzes.length && !loading) getSelfQuizzes();

    if (selfQuizzes.length && filteredQuizzes.length !== selfQuizzes.length) {
      console.log('check: ', filteredQuizzes.length !== selfQuizzes.length)
      setFilteredQuizzes(selfQuizzes);
    }
  }, [loading]);

  const getStats = (quizId: string) => {
    const quizWithStats = selfQuizzesWithStats.quizzes.find(data => data.quiz.id === quizId);
    if (selfQuizzesWithStats && quizWithStats) {
      return quizWithStats.stats;
    }
    return null;
  }

  const onChangeSearch = (event) => {
    if (!event || !event.target) return;

    const filterLine = event.target.value.toLowerCase();
    setFilteredQuizzes(selfQuizzes.filter(quiz => quiz.title.toLowerCase().indexOf(filterLine) !== -1));
  }

  if (loading) return <Card className={styles.quizzesLoading}><HTag size="m">Your quizzes is loading...</HTag></Card>;
  if (!selfQuizzes.length && !loading) return <Card className={styles.quizzesLoading}><HTag size="m">You haven't created any quizzes</HTag></Card>;
  return <div>
    <div>
      <Input
        type="text"
        onChange={onChangeSearch}
        className={styles.filterInput}
        placeholder="Filter by title"
      />
      {/*<Button></Button>*/}
      {/*<></>*/}
    </div>
    {
      filteredQuizzes.map(q => <QuizWithStatsBoilerplate quizData={q} key={q.id} stats={getStats(q.id)}/>)
    }
  </div>;
};