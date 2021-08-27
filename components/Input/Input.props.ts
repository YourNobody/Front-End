import { DetailedHTMLProps, InputHTMLAttributes, PropsWithRef } from "react";
export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
}