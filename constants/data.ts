import { IQuizData, QuestionTypes } from "../interfaces/quizes.interface";
import SA_Image from '../src/assets/quiz-page/sa.jfif';
import TA_Image from '../src/assets/quiz-page/ta.jpg';
import RA_Image from '../src/assets/quiz-page/ra.jfif';
import AB_Image from '../src/assets/quiz-page/ab.jfif';

export const quizesNames = {
  SA: 'Select Quizes',
  TA: 'Text Quizes',
  RA: 'Rating Quizes',
  AB: 'A/B Quizes'
};
export const quizesData: IQuizData[] = [
  { title: quizesNames.SA, description: 'In this type of questions you can choose one or more answers', src: SA_Image, type: QuestionTypes.SA, withSubscription: false },
  { title: quizesNames.TA, description: 'Here you need to answer a question using text and your own thoughts', src: TA_Image, type: QuestionTypes.TA, withSubscription: false },
  { title: quizesNames.RA, description: 'You can set a "Rating" as an answe', src: RA_Image, type: QuestionTypes.RA, withSubscription: false },
  { title: quizesNames.AB, description: 'It\'s questions that provide you for only two answer', src: AB_Image, type: QuestionTypes.AB, withSubscription: true }
];

export type profileChangeKeys = 'nickname' | 'email' | 'password';

export const profileChangeOptions = {
  nickname: {
    inputs: [{
      name: 'nickname',
      type: 'text',
      label: 'New nickname',
      placeholder: 'Enter your new nickname'
    }],
  },
  email: {
    inputs: [{
      name: 'email',
      type: 'email',
      label: 'New email',
      placeholder: 'Enter your new email'
    }]
  },
  password: {
    inputs: [
      {
        name: 'old_password',
        type: 'password',
        label: 'Old password',
        placeholder: 'Enter your old password'
      },
      {
        name: 'password',
        type: 'password',
        label: 'New password',
        placeholder: 'Enter your new password'
      },
      {
        name: 'confirm',
        type: 'password',
        label: 'Confirm new password',
        placeholder: 'Confirm your new password'
      }
    ]
  }
};