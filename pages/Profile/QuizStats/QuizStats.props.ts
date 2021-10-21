import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IQuiz } from "../../../interfaces/quizes.interface";

export interface QuizWithStatsBoilerplateProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  quizData: IQuiz;
}