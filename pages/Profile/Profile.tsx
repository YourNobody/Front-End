import React from 'react';
import { ProfileProps } from './Profile.props';
import styles from './Profile.module.css';
import { withMainLayout } from '../../layouts/MainLayout';

export const Profile = (props: ProfileProps): JSX.Element => {
  return (
    <h1>Profile</h1>
  );
};

export default withMainLayout(Profile);