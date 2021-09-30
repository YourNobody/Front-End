import { useState } from 'react';
import { AccountInfoProps } from './AccountInfo.props';
import styles from './AccountInfo.module.css';
import { Image, HTag, Card, Button, Input } from '../../../components';
import cn from 'classnames';
import { profileChangeKeys, profileChangeOptions } from '../../../constants/data';
import { useInput } from '../../../hooks/useInput.hook';
import { WithMessage } from '../../../interfaces/quizes.interface';
import { useRequest } from '../../../hooks/useRequest';
import { useActions } from '../../../hooks/useActions.hook';
import { LOCALSTORAGE_USER_DATA_NAME, statuses } from '../../../constants/app';
import { IUserWithToken } from '../../../interfaces/user.interface';
import { useResolver } from '../../../hooks/useResolver.hook';
import { useForm } from 'react-hook-form';

export const AccountInfo = ({nickname, email, imageUrl, ...props}: AccountInfoProps): JSX.Element => {
  const Resolver = useResolver();
  const { register, reset, formState: { errors } } = useForm({});
  const [openBlocks, setOpenBlocks] = useState<string[]>([]);
  const { setAppAlert, fetchUserSuccess } = useActions();
  const { request, loading } = useRequest();
  const { getValue, onChange, clearValue } = useInput();

  const handleBlockToggling = (key: profileChangeKeys): void => {
    if (openBlocks.includes(key)) return setOpenBlocks(openBlocks.filter(k => k !== key));
    return setOpenBlocks([...openBlocks, key]);
  };

  const handleChange = async (key: profileChangeKeys) => {
    console.log('key: ', key);
    
    const body: any = { key };
    switch(key) {
      case 'nickname': {
        body.nickname = getValue(key);
        break;
      }
      case 'email': {
        body.email = getValue(key);
        break;
      }
      case 'password': {
        body.oldPassword = getValue('oldPassword');
        body.password = getValue(key);
        body.confirm = getValue('confirm');
        break;
      }
    }

    try {
      const data: WithMessage = await request('/profile/change', 'POST', body);
      const userData: IUserWithToken = JSON.parse(localStorage.getItem(LOCALSTORAGE_USER_DATA_NAME));
      delete body.key;
      (key === 'email' || key === 'nickname') && fetchUserSuccess({
        user: {
          ...userData.user,
          ...body
        },
        token: userData.token,
      });
      setAppAlert(data.message, statuses.SUCCESS);
      clearValue();
    } catch (err) {
      setAppAlert(err.message, statuses.ERROR);
    }
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
        {
          Object.entries(profileChangeOptions).map(opt => {
            const name = opt[0] as profileChangeKeys;
            const data = opt[1];

            return (
              <form data-change="nickname" key={name}>
                <div className={cn(styles.change, { [styles.changeOpened]: openBlocks.includes(name) })} data-change={name} onClick={() => handleBlockToggling(name)}>
                  Change {name[0].toUpperCase() + name.slice(1)}
                </div>
                <div className={cn(styles.changeBlock, {
                  [styles.changeBlockOpened]: openBlocks.includes(name)
                })}>
                  {
                    data.inputs.map((props, i) => <Input
                      key={i}
                      {...props}
                      onChange={onChange}
                      autoComplete="off"
                      value={getValue(props.name)}
                    />)
                  }
                  <Button color="ghost" onClick={() => handleChange(name)}>Change {name[0].toUpperCase() + name.slice(1)}</Button>
                </div>
              </form>
            );
          })
        }
      </div>
    </Card>
  );
};