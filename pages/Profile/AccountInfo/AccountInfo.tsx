import { AccountInfoProps } from './AccountInfo.props';
import styles from './AccountInfo.module.css';
import { Image, HTag, Card} from '../../../components';
import { Link } from 'react-router-dom';
import {routes} from "../../../constants/routes";
import {useTypedSelector} from "../../../hooks/useTypedSelector.hook";

export const AccountInfo = ({...props}: AccountInfoProps): JSX.Element => {
  const { nickname, email, premium, subscriptions, quizzes } = useTypedSelector(state => state.user.user);

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
      {/*<div className={styles.imageWrapper}>*/}
      {/*  {*/}
      {/*    imageUrl*/}
      {/*    ?  <Image src={imageUrl} alt="My Image" fit="contain"  className={styles.image}/>*/}
      {/*    :  <Image text={nickname} className={styles.image}/>*/}
      {/*  }*/}
      {/*</div>*/}
      <div className={styles.changeInfo}>
        <HTag className={styles.changeInfoTitle}>Account actions:</HTag>
        <Link to={routes.PROFILE.ACCOUNT_CHANGE_NAME}>Change name</Link>
        <Link to={routes.PROFILE.ACCOUNT_CHANGE_EMAIL}>Change email</Link>
        <Link to={routes.PROFILE.ACCOUNT_CHANGE_PASSWORD}>Change password</Link>
      </div>
    </Card>
  );
};