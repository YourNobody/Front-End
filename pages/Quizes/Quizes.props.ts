import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface QuizesProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title?: string;
}