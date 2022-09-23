import {DetailedHTMLProps, InputHTMLAttributes, MutableRefObject} from "react";
import {FieldError} from "react-hook-form";
export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  error?: FieldError;
  hasValue?: string | number | boolean;
}