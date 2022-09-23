import React, {FC, useEffect} from 'react';
import { Page404Props } from './404.props';
import styles from './404.module.css';
import { withMainLayout } from '../../layouts/MainLayout/MainLayout';
import {Button, HTag} from "../../components";
import {useActions} from "../../hooks/useActions.hook";

export const Page404: FC<Page404Props> = (props) => {
  const {openModal} = useActions();


  useEffect(() => {
    function beforeUnload(e) {
      console.log(e)
      // openModal({
      //   actionFunc: () => {},
      //   actionButtonName: 'Leave',
      //   closeButtonName: 'Redirect to Home',
      //   modalQuestion: 'Do you really want to leave the page?'
      // });
    }

    console.log('here')
    window.addEventListener('beforeunload', beforeUnload);

    return () => {
      window.removeEventListener('beforeunload', beforeUnload);
    }
  },[]);

  return (
    <div>
      <HTag>The page you are looking for is non-existent</HTag>
      <Button>Redirect to home page</Button>
    </div>
  );
};

export default withMainLayout(Page404);