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

const QuizWithStatsBoilerplate: FC<QuizWithStatsBoilerplateProps> = ({ quizData, onRemove, ...props }) => {
  const [hidden, setHidden] = useState<boolean>(true);
  const [usersAnswersStats, setUsersAnswersStats] = useState<IQuizStatistic[]>([]);
  const { request, error, clearError, loading } = useRequest();
  const { openModal, closeModal, setAppAlert } = useActions();
    
  const handleShowStats = async (id: string | number) => {
    setHidden(false);
    try {
      const data = await request<IQuizResponse>('/quizes/statistics?quizId=' + (id || ''), 'GET');
      setUsersAnswersStats(data.usersAnswers);
    } catch (err) {
      console.error(err);
      setAppAlert(err.message, statuses.ERROR);
      clearError();
    }
  };

  const deleteQuiz = async () => {
    try {
      const body = {} as { quizId: string; };
      body.quizId = quizData.id;
      const data: WithMessage = await request('/quizes/remove', 'POST', body, {});
      setAppAlert(data.message, statuses.SUCCESS);
      onRemove();
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveQuiz = () => {
    openModal(getModalBoilerplate(`Do you want to delete this quiz?\nTitle: ${quizData.title} and type: ${quizData.type}`, deleteQuiz, 'Delete', closeModal));
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
        loading ? <HTag size="m">Loading statistics...</HTag>
        : 
        <>
          <HTag size="s">Answers: {quizData.usersAnswers.length}</HTag>
          <ResponsiveContainer width="50%" height="90%">
            <ComposedChart
              layout="vertical"
              width={500}
              data={usersAnswersStats}
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
  const { error, loading, request, clearError } = useRequest();
  const { fetchSelfQuizzes } = useActions();
  const [quizes, setQuizes] = useState<IQuiz[]>([]);
  
  useEffect(() => {
    fetchSelfQuizzes();
  }, []);

  const handleRemoveQuizFromTheList = (id: string) => {
    setQuizes(quizes.filter(q => q.id !== id));
  };
      
  if (loading) return <HTag size="m">Your questions is loading...</HTag>;
  if (!quizes.length && !loading) return <HTag size="m">You haven't created any quizzes</HTag>;
  return <div>
    {
      quizes.map(q => <QuizWithStatsBoilerplate key={q.id} quizData={q} onRemove={() => handleRemoveQuizFromTheList(q.id)}/>)
    }
  </div>;
};