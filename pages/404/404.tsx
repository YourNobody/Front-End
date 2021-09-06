import React, { FC } from 'react';
import { Page404Props } from './404.props';
import styles from './404.module.css';
import { withMainLayout } from '../../layouts/MainLayout/MainLayout';

export const Page404: FC<Page404Props> = (props) => {
  return (
    <h1>Error, 404</h1>
  );
};

export default withMainLayout(Page404);