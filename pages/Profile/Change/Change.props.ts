import {DetailedHTMLProps, HTMLAttributes} from "react";

export interface ChangeProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    changeOption: 'name' | 'email' | 'password';
}