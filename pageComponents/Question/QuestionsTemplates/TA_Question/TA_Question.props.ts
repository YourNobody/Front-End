import { DetailedHTMLProps, HTMLAttributes } from "react";
import { MainQuestionsProps } from "../../../../interfaces/quizes.interface";

export interface TA_QuestionProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, MainQuestionsProps {}