import { useState } from 'react';
import { AccountInfoProps } from './AccountInfo.props';
import styles from './AccountInfo.module.css';
import { Image, HTag, Card, Button, Input } from '../../../components';
import cn from 'classnames';
import { profileChangeKeys, profileChangeOptions } from '../../../constants/data';
import { useInput } from '../../../hooks/useInput.hook';
import { useRequest } from '../../../hooks/useRequest';
import { useActions } from '../../../hooks/useActions.hook';
import { Link } from 'react-router-dom';
import {routes} from "../../../constants/routes";

export const AccountInfo = ({nickname, email, imageUrl, ...props}: AccountInfoProps): JSX.Element => {
  const [openBlocks, setOpenBlocks] = useState<string[]>([]);
  const { userChangeInfo } = useActions();
  const { register, handleSubmit, clearValues } = useInput();
  const [ selectedChangeKey, setSelectedChangeKey ] = useState<profileChangeKeys>(null);

  const handleBlockToggling = (key: profileChangeKeys): void => {
    if (openBlocks.includes(key)) return setOpenBlocks(openBlocks.filter(k => k !== key));
    return setOpenBlocks([...openBlocks, key]);
  };

  const handleChange = async (formData: any) => {
    const body: any = { key: selectedChangeKey };
    switch (selectedChangeKey) {
      case 'nickname': {
        body.nickname = formData[selectedChangeKey];
        break;
      }
      case 'email': {
        body.email = formData[selectedChangeKey];
        break;
      }
      case 'password': {
        body.oldPassword = formData['old_password'];
        body.password = formData[selectedChangeKey];
        body.confirm = formData['confirm'];
        break;
      }
      default: return;
    }

    userChangeInfo(body);
    clearValues(body);
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
        <HTag className={styles.changeInfoTitle}>Account actions:</HTag>
        <Link to={routes.PROFILE.ACCOUNT_CHANGE_NAME}>Change name</Link>
        <Link to={routes.PROFILE.ACCOUNT_CHANGE_EMAIL}>Change email</Link>
        <Link to={routes.PROFILE.ACCOUNT_CHANGE_PASSWORD}>Change password</Link>
      </div>
    </Card>
  );
};