import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from "react";

export interface AuthorizationProps extends PropsWithChildren<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> {
  title?: string;
}