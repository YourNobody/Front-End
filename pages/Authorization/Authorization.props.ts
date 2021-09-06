import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from "react";

export interface AuthorizationProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title?: string;
}