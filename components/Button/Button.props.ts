import { DetailedHTMLProps, PropsWithChildren, ButtonHTMLAttributes } from "react";
export interface ButtonProps extends PropsWithChildren<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> {
  color?: 'primary' | 'ghost';
}