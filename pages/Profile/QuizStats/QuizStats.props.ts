import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface QuizWithStatsBoilerplateProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  quizData: any;
  onRemove: () => void
}