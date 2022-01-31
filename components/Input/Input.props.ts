import {DetailedHTMLProps, InputHTMLAttributes, MutableRefObject} from "react";
export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  error?: string;
  useInputRef?: (ref: MutableRefObject<HTMLInputElement>) => void;
}