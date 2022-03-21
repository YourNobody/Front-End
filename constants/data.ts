import { IQuizData, QuizzesTypes } from "../interfaces/quizes.interface";

export const quizesNames = {
  sa: 'Select Quizes',
  ta: 'Text Quizes',
  ra: 'Rating Quizes',
  ab: 'A/B Quizes'
};
export const quizesData: IQuizData[] = [
  { title: quizesNames.sa, description: 'In this type of questions you can choose one or more answers', type: QuizzesTypes.sa, withSubscription: false },
  { title: quizesNames.ta, description: 'Here you need to answer a question using text and your own thoughts', type: QuizzesTypes.ta, withSubscription: false },
  { title: quizesNames.ra, description: 'You can set a "Rating" as an answe', type: QuizzesTypes.ra, withSubscription: false },
  { title: quizesNames.ab, description: 'It\'s questions that provide you for only two answer', type: QuizzesTypes.ab, withSubscription: true }
];