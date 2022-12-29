import { DetailedHTMLProps, HTMLAttributes } from "react";
export interface HRProps extends DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement> {
  color?: 'gray' | 'white' | 'blue'
}