import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
export interface HTagProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
  children: ReactNode;
  size?: 's' | 'small' | 'medium' | 'm' | 'large' | 'l';
}