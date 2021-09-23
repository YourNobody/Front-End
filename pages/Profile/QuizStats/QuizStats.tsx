import { FC, useEffect, useState } from 'react';
import { QuizWithStatsBoilerplateProps } from './QuizStats.props';
import styles from './QuizStats.module.css';
import { HTag, Card, Button } from '../../../components';
import { useRequest } from '../../../hooks/useRequest';
import { useActions } from '../../../hooks/useActions.hook';
import { statuses } from '../../../constants/app';
import cn from 'classnames';
import { formatDate } from '../../../helpers/custom.helper';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area
} from "recharts";

const QuizWithStatsBoilerplate: FC<QuizWithStatsBoilerplateProps> = ({ quizData, ...props }) => {
  const [hidden, setHidden] = useState<boolean>(true);

  if (!quizData) return <></>;
  return <Card
    {...props}
    className={styles.myCard}
  >
    <HTag size="m">{quizData.title}</HTag>
    <div className={styles.infoActions}>
      <HTag size="s">Created at: {formatDate(quizData.createdAt)}</HTag>
      {hidden && <Button color="ghost" onClick={() => setHidden(false)}>Show statistics</Button>}
      {!hidden && <Button color="primary" onClick={() => setHidden(true)}>Hide</Button>}
    </div>
    <div className={cn(styles.statistics, {
      [styles.hidden]: hidden
    })}>
      Answers: {quizData.usersAnswers.length}
      <pre>{JSON.stringify(quizData.usersAnswers.map((qa) => qa.answer + ' | ' + qa.createdAt), null, 2)}</pre>
      <ComposedChart
        layout="vertical"
        width={500}
        height={600}
        data={quizData.usersAnswers}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type="number" />
        <YAxis dataKey="answer" type="category" scale="band" />
        <Tooltip />
        <Legend />
        <Bar dataKey="" barSize={20} fill="#413ea0" />
      </ComposedChart>
    </div>
  </Card>;
};

export const QuizStats: FC<any> = () => {
  const { error, loading, request, clearError } = useRequest();
  const { setAppAlert } = useActions();
  const [quizes, setQuizes] = useState<any[]>([]);
  console.log(quizes);
  
  useEffect(() => {
    const getSelfQuizes = async () => {
      try {
        const data: any = await request('/quizes', 'GET');
        console.log(data);
        setQuizes(data.quizes);
      } catch (err) {
        setAppAlert(err.message, statuses.ERROR);
      }
    };

    getSelfQuizes();
  }, []);
      
  if (loading) return <HTag size="m">Your questions is loading...</HTag>;
  if (!quizes.length && !loading) return <HTag size="m">You haven't created any quizzes</HTag>;
  return <div>
    {
      quizes.map(q => <QuizWithStatsBoilerplate key={q._id} quizData={q}/>)
    }
  </div>;
};