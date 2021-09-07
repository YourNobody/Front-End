import { IQuizData, QuestionTypes } from "../interfaces/quizes.interface";
import SA_Image from '../src/assets/quiz-page/sa.jfif';
import TA_Image from '../src/assets/quiz-page/ta.jpg';
import RA_Image from '../src/assets/quiz-page/ra.jfif';
import AB_Image from '../src/assets/quiz-page/ab.jfif';

export const quizesData: IQuizData[] = [
  { title: 'Select Questions', description: 'In this type of questions you can choose one or more answers', src: SA_Image, type: QuestionTypes.SA },
  { title: 'Text Questions', description: 'Here you need to answer a question using text and your own thoughts', src: TA_Image, type: QuestionTypes.TA },
  { title: 'Rating Questions', description: 'You can set a "Rating" as an answe', src: RA_Image, type: QuestionTypes.RA },
  { title: 'A/B Question', description: 'It\'s questions that provide you for only two answer', src: AB_Image, type: QuestionTypes.AB }
];