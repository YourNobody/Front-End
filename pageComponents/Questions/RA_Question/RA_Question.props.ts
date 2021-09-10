import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface RA_QuestionProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  target: 'question' | 'image';
  content: string;
}