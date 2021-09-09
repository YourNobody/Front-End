import { DetailedHTMLProps, HTMLAttributes } from "react";
export interface ImageProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  src?: string;
  alt?: string;
  fit?: 'contain' | 'cover' | 'fill' | 'none';
  text?: string;
  isCircled?: boolean;
  fully?: boolean;
}