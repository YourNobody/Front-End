import React from 'react';
import { Link } from 'react-router-dom';
import { withMainLayout } from '../../layouts/MainLayout/MainLayout';
import { HomeProps } from './Home.props';

const Home = (props: HomeProps): JSX.Element => {
  return (
    <div {...props}>
      <h1>Hello World, It's React App</h1>
      <Link to="/quizes">Quizes</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/auth">Authorization</Link>
      <Link to="/erro12321321vwvwk">Black Hole</Link>
    </div>
  );
};

export default withMainLayout(Home);