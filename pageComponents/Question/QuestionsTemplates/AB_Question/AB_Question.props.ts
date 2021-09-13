import { DetailedHTMLProps, HTMLAttributes } from "react";
import { MainQuestionsProps } from "../../../../interfaces/quizes.interface";

export interface AB_QuestionProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, MainQuestionsProps {
  questionAnswers?: [string, string];
}