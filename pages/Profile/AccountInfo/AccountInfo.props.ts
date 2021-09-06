import { DetailedHTMLProps, HTMLAttributes } from "react";
export interface AccountInfoProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  firstName?: string;
  lastName?: string;
  email: string;
  imageUrl?: string;
}