import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from "react";
export interface HTagProps extends PropsWithChildren<DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>> {
  size?: 's' | 'small' | 'medium' | 'm' | 'large' | 'l';
}