import { FC, useEffect, useState } from 'react';
import { QuizWithStatsBoilerplateProps } from './QuizStats.props';
import styles from './QuizStats.module.css';
import { HTag, Card, Button } from '../../../components';
import { useActions } from '../../../hooks/useActions.hook';
import { statuses } from '../../../constants/app';
import cn from 'classnames';
import { changeStatisticsTooltipLabel, formatDate } from '../../../helpers/custom.helper';
import { useRequest } from '../../../hooks/useRequest';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import './rechart.css';
import { getModalBoilerplate } from '../../../pageComponents';
import { IQuiz, IQuizStatistic, IQuizResponse, IResponseQuiz, WithMessage } from '../../../interfaces/quizes.interface';
import { useTypedSelector } from '../../../hooks/useTypedSelector.hook';

const QuizWithStatsBoilerplate: FC<QuizWithStatsBoilerplateProps> = ({ quizData, ...props }) => {
  const [hidden, setHidden] = useState<boolean>(true);
  const { selfQuizzesWithStats, loading } = useTypedSelector(state => state.quiz);
  const { openModal, closeModal, getQuizStats, deleteQuiz } = useActions();
    
  const handleShowStats = async (id: string | number) => {
    setHidden(false);
    getQuizStats(id);
  };

  const handleDeleteQuiz = async () => {
      deleteQuiz(quizData.id)
      closeModal();
  };

  const handleRemoveQuiz = () => {
    openModal({
      actionFunc: handleDeleteQuiz,
      actionButtonName: 'Delete',
      closeButtonName: 'No',
      modalQuestion: `Do you want to delete this quiz?\nTitle: ${quizData.title} and type: ${quizData.type}`
    });
  };

  if (!quizData) return <></>;
  return <Card
    {...props}
    className={styles.myCard}
  >
    <HTag size="m">Title: {quizData.title}</HTag>
    <HTag size="s" className={styles.typeQuziStat}>Type: {quizData.type}</HTag>
    <Button color="danger" className={styles.closeCard} onClick={handleRemoveQuiz}>&#215;</Button>
    <div className={styles.infoActions}>
      <HTag size="s">Created at: {formatDate(quizData.createdAt)}</HTag>
      {hidden && <Button color="ghost" onClick={() => handleShowStats(quizData.id)}>Show statistics</Button>}
      {!hidden && <Button color="primary" onClick={() => setHidden(true)}>Hide</Button>}
    </div>
    <div className={cn(styles.statistics, {
      [styles.hidden]: hidden
    })}>
      {
        selfQuizzesWithStats.loading ? <HTag size="m">Loading statistics...</HTag>
        : 
        <>
          <HTag size="s">Answers: {quizData.usersAnswers.length}</HTag>
          <ResponsiveContainer width="50%" height="90%">
            <ComposedChart
              layout="vertical"
              width={500}
              data={selfQuizzesWithStats.quizzes.find(q => q.id === quizData.id)?.usersAnswers}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis type="number"/>
              <YAxis dataKey="answer" type="category" scale="band" />
              <Tooltip separator="" formatter={(value, name, props) => changeStatisticsTooltipLabel(value, name, props)('amount', 'Amount')}/>
              <Legend
                payload={[{
                  value: 'Amount of questions',
                  color: '#66fcf1'
                }]}
              />
              <Bar dataKey="amount" barSize={15} fill="#66fcf1"/>
            </ComposedChart>  
          </ResponsiveContainer>
        </>
      }
    </div>
  </Card>;
};

export const QuizStats: FC<any> = () => {
  const { fetchSelfQuizzes } = useActions();
  const { selfQuizzes, loading } = useTypedSelector(state => state.quiz);
  
  useEffect(() => {
    fetchSelfQuizzes();
  }, []);

      
  if (loading) return <HTag size="m">Your questions is loading...</HTag>;
  if (!selfQuizzes.length && !loading) return <HTag size="m">You haven't created any quizzes</HTag>;
  return <div>
    {
      selfQuizzes.map(q => <QuizWithStatsBoilerplate key={q.id} quizData={q}/>)
    }
  </div>;
};