import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface AB_QuestionProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  question: string;
  answers: [string, string];
}