import { DetailedHTMLProps, HTMLAttributes } from "react";
export interface AccountInfoProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  nickname: string;
  email: string;
  imageUrl?: string;
}