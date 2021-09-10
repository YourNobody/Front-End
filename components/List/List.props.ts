import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ListProps extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  list: string[];
  onClose?: (index: number) => void;
}