import React from 'react';
import { withMainLayout } from '../../layouts/MainLayout';
import { HomeProps } from './Home.props';

const HomeComponent = (props: HomeProps): JSX.Element => {
  return (
    <div {...props}>
      <h1>Hello World, It's React App</h1>
    </div>
  );
};

export const Home = withMainLayout(HomeComponent);