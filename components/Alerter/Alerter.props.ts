import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from "react";
import { statuses } from "../../constants/vars";
export interface AlerterProps extends PropsWithChildren<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> {
  message: string;
  status: statuses;
}