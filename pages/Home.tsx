import React from 'react';
import { withMainLayout } from '../layouts/MainLayout';

const Home = (): JSX.Element => {
  return (
    <>
      <h1>Hello World, It's React App</h1>
    </>
  );
};

export default withMainLayout(Home);