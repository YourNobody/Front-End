import React, { useState } from 'react';
import { AccountInfoProps } from './AccountInfo.props';
import styles from './AccountInfo.module.css';
import { Image, HTag, Card, Button, Input } from '../../../components';
import cn from 'classnames';

export const AccountInfo = ({nickname, email, imageUrl, ...props}: AccountInfoProps): JSX.Element => {
  const [theOpened, setTheOpened] = useState<boolean>(false);
  const getNickname = (nick: string) => {
    const splitted = nick.split(/\s/g);
    
    if (splitted.length >= 2) {
      return splitted[0].substring(0, 1).toUpperCase() + splitted[1].substring(0, 1).toUpperCase();
    } else if (splitted.length === 1) {
      return splitted[0].substring(0, 1).toUpperCase();
    }
    return 'YOU';
  };

  // const handleChangingOpening = (e) => {
  //   const target = e.target;
    
  //   if (target.dataset.change) {
  //     setTheOpened(target.dataset.change);

  //   }
  // };

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
        <div data-change="nickname">
          <div className={cn(styles.change, { [styles.changeOpened]: theOpened })} data-change="name" onClick={() => setTheOpened(true)}>Change Nickname</div>
          <div className={cn(styles.changeBlock, {
            [styles.changeBlockOpened]: theOpened
          })}>
            <Input name="nickname"/>
            <Button color="ghost">Change</Button>
          </div>
        </div>
        <div data-change="email">
          <div className={styles.change} data-change="email">Change Email</div>
          <div className={styles.changeBlok}>

          </div>
        </div>
        <div data-change="password">
          <div className={styles.change} data-change="password">Change Password</div>
          <div className={styles.changeBlok}>

          </div>
        </div>
        <div data-change="image">
          <div className={styles.change} data-change="input">Change Image</div>
          <div className={styles.changeBlok}>

          </div>
        </div>
      </div>
    </Card>
  );
};