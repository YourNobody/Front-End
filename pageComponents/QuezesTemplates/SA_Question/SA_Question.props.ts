import { MainQuestionsProps } from "../../../interfaces/quizes.interface";
import { WithOnSave } from '../general.interface'

export interface SA_QuestionProps extends MainQuestionsProps, WithOnSave {
  variants?: {answer: string; _id: string}[];
}