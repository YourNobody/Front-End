import React from 'react';
import { HTagProps } from './HTag.props';
import styles from './HTag.module.css';

export const HTag = ({ children, size = 'm', className }: HTagProps): JSX.Element => {
  switch (size) {
    case 'small':
    case 's': {
      return <h3 className={className}>{children}</h3>;
    }
    case 'medium':
    case 'm': {
      return <h2 className={className}>{children}</h2>;
    }
    case 'large':
    case 'l': {
      return <h1 className={className}>{children}</h1>;
    }
    default: return <h2 className={className}>{children}</h2>;
  }
};