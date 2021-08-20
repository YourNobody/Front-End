import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
export interface ImageProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  src: string;
  alt?: string;
  fit?: 'containt' | 'cover' | 'fill' | 'none';
}