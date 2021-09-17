import React from 'react';
import { AccountInfoProps } from './AccountInfo.props';
import styles from './AccountInfo.module.css';
import { Image, HTag, Card, Button } from '../../../components';
import cn from 'classnames';

export const AccountInfo = ({nickname, email, imageUrl, ...props}: AccountInfoProps): JSX.Element => {
  const getNickname = (nick: string) => {
    const splitted = nick.split(/\s/g);
    
    if (splitted.length >= 2) {
      return splitted[0].substring(0, 1).toUpperCase() + splitted[1].substring(0, 1).toUpperCase();
    } else if (splitted.length === 1) {
      return splitted[0].substring(0, 1).toUpperCase();
    }
    return 'YOU';
  };

  return (
    <Card {...props} className={styles.info}>
      <div className={styles.content}>
        <div>
          <HTag size="m" className={styles.infoLine}>
            <span>Your Nickname:</span>
            <span>{nickname}</span>
          </HTag>
        </div>
        <div>
          <HTag size="m" className={styles.infoLine}>
            <span>Your Email:</span>
            <span>{email}</span>
          </HTag>
        </div>
      </div>
      <div className={styles.imageWrapper}>
        {
          imageUrl 
          ?  <Image src={imageUrl} alt="My Image" fit="contain"  className={styles.image}/>
          :  <Image text={nickname} className={styles.image}/>
        }
      </div>
      <div className={styles.changeInfo}>
      <hr className={styles.hr} />
        <div className={styles.change} data-change="name">Change Nickname</div>
        <div className={styles.change} data-change="email">Change Email</div>
        <div className={styles.change} data-change="password">Change Password</div>
        <div className={styles.change} data-change="input">Change Image</div>
      </div>
    </Card>
  );
};