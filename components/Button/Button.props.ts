import { DetailedHTMLProps, ReactNode, ButtonHTMLAttributes } from "react";
export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: ReactNode;
  color?: 'primary' | 'ghost';
}