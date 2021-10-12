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

export const AccountInfo = ({nickname, email, imageUrl, ...props}: AccountInfoProps): JSX.Element => {
  const Resolver = useResolver();
  const [openBlocks, setOpenBlocks] = useState<string[]>([]);
  const { setAppAlert, fetchUserSuccess } = useActions();
  const { request, loading } = useRequest();
  const { register, handleSubmit, clearValues, getValues } = useInput();
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
    try {
      const data: WithMessage = await request('/profile/change', 'POST', body);
      const userData: IUserWithToken = JSON.parse(localStorage.getItem(LOCALSTORAGE_USER_DATA_NAME));
      delete body.key;
      (selectedChangeKey === 'email' || selectedChangeKey === 'nickname') && fetchUserSuccess({
        user: {
          ...userData.user,
          ...body
        },
        token: userData.token,
      });
      setAppAlert(data.message, statuses.SUCCESS);
      clearValues(body);
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
              <form key={name} onSubmit={handleSubmit(handleChange)}>
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
                      {...register(props.name)}
                      autoComplete="off"
                    />)
                  }
                  <Button
                    color='ghost' type='submit'
                    onClick={() => setSelectedChangeKey(name)}
                  >
                    Change {name[0].toUpperCase() + name.slice(1)}
                  </Button>
                </div>
              </form>
            );
          })
        }
      </div>
    </Card>
  );
};