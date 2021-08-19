import React from 'react';
import { AuthorizationProps } from './Authorization.props';
import styles from './Authorization.module.css';
import { withMainLayout } from '../../layouts/MainLayout';

export const Authorization = (props: AuthorizationProps): JSX.Element => {
  return (
    <h1>Authorization</h1>
  );
};

export default withMainLayout(Authorization);