import React from 'react';
import { AccountInfoProps } from './AccountInfo.props';
import styles from './AccountInfo.module.css';
import { Image, HTag, Card, Button } from '../../../components';
import cn from 'classnames';

export const AccountInfo = ({firstName, lastName, email, imageUrl, ...props}: AccountInfoProps): JSX.Element => {
  return (
    <Card {...props} className={styles.info}>
      <div className={styles.content}>
        <div>
          <HTag size="m" className={styles.infoLine}>
            <span>Your Firstname:</span>
            <span className={cn({
              [styles.unfilled]: !firstName
            })}>{firstName || 'Fill the field'}</span>
          </HTag>
        </div>
        <div>
          <HTag size="m" className={styles.infoLine}>
            <span>Your Lastname:</span>
            <span className={cn({
              [styles.unfilled]: !lastName
            })}>{lastName || 'Fill the field'}</span>
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
          :  <Image isEmpty text="Pavel" className={styles.image}/>
        }
      </div>
      <div className={styles.changeInfo}>
      <hr className={styles.hr} />
        <div className={styles.change} data-change="name">Change User Initials</div>
        <div className={styles.change} data-change="email">Change Email</div>
        <div className={styles.change} data-change="password">Change Password</div>
        <div className={styles.change} data-change="input">Change Image</div>
      </div>
    </Card>
  );
};