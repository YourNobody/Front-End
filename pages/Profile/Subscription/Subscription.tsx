import React, { FC, useEffect, useState } from 'react'
import styles from './Subscription.module.css';
import { Button, Card, HTag, Input } from '../../../components';
import { useInput } from '../../../hooks/useInput.hook';
import { SubscriptionProps } from './Subscription.props';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import { useActions } from '../../../hooks/useActions.hook';
import { useTypedSelector } from '../../../hooks/useTypedSelector.hook';
import './Subscription.module.css';
import { formatPrice } from '../../../helpers/custom.helper'

const CARD_ELEMENT_OPTIONS = {
  hidePostalCode: true
};

export const Subscription: FC<SubscriptionProps> = () => {
  const { register, handleSubmit } = useInput();
  const [ chosenSub, setChosenSub ] = useState<any>(null);
  const { getClientSecretAndSubscribe, getAllSubscriptionsProducts } = useActions();
  const { subscription, loading, user: { email } } = useTypedSelector(state => state.user);
  const { subscriptions, loading: loadingApp } = useTypedSelector(state => state.app);
  console.log(subscriptions)
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    getAllSubscriptionsProducts();
  }, []);

  const handleChoice = (sub: any) => {
    setChosenSub(sub);
  };

  const handleSubmitSubscription = async (formData) => {
    if (!stripe || !elements) return;
    getClientSecretAndSubscribe(chosenSub.price.id, stripe, email ,{
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: { email },
    });
  };
  if (loadingApp) return <Card className={styles.loadingCard}>
    <HTag size="m"  className={styles.loadingTitle}>Load subscriptions info...</HTag>
  </Card>;
  return <Card className={styles.subscription}>
    <HTag size="l" className={styles.subTitle}>Subscription to new opportunities</HTag>
    {
      subscriptions.length && <div className={styles.allSubs}>
        {
          subscriptions.map(sub => <Card className={styles.sub} key={sub.id}>
            <HTag size="m" className={sub.unit_label === 'gold' ? styles.gold : ''}>{sub.name}</HTag>
            <p>{sub.description}</p>
            <Button
              className={sub.unit_label === 'gold' ? styles.gold : ''}
              color={sub.unit_label === 'silver' ? 'ghost' : 'primary'}
              onClick={() => handleChoice(sub)}
            >Pay {formatPrice(sub.price.unit_amount / 100)}</Button>
          </Card>)
        }
      </div>
    }
    { chosenSub && <form onSubmit={handleSubmit(handleSubmitSubscription)}>
        <HTag size="m" className={styles.formTitle}>For payment: {chosenSub.description}</HTag>
        <Input
          label="Email"
          disabled={!!email}
          placeholder="Enter your email"
          {...register('email', null, {
            initialValue: email
          })}
        />
        <CardElement options={CARD_ELEMENT_OPTIONS} className={styles.cardElement}/>
        <Button color="primary" type="submit">Subscribe for {formatPrice(chosenSub.price.unit_amount / 100)}</Button>
      </form>
    }
  </Card>;
};