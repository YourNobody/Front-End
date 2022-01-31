import React, { FC, useEffect, useState } from 'react';
import styles from './Subscription.module.css';
import { Button, Card, HTag, Input } from '../../../components';
import { useInput } from '../../../hooks/useInput.hook';
import { SubscriptionProps } from './Subscription.props';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import { useActions } from '../../../hooks/useActions.hook';
import { useTypedSelector } from '../../../hooks/useTypedSelector.hook';
import './Subscription.module.css';
import { formatPrice } from '../../../helpers/custom.helper';
import cn from 'classnames';

const CARD_ELEMENT_OPTIONS = {
  hidePostalCode: true
};

export const Subscription: FC<SubscriptionProps> = () => {
  const { register, handleSubmit } = useInput();
  const [ chosenSub, setChosenSub ] = useState<any>(null);
  const { getClientSecretAndSubscribe, getAllSubscriptionsProducts, cancelSubscription } = useActions();
  const { subscriptions: mySubs, loading, user: { email } } = useTypedSelector(state => state.user);
  const { subscriptions, loading: loadingApp } = useTypedSelector(state => state.app);
  const stripe = useStripe();
  const elements = useElements();

  console.log('chosen: ', chosenSub)

  useEffect(() => {
    getAllSubscriptionsProducts();
  }, []);

  const handleChoice = (sub: any) => {
    setChosenSub(sub);
  };

  const handleSubscriptionCancel = (id: string) => {
    cancelSubscription(id);
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
          subscriptions.map(sub => <Card
            className={cn(styles.sub, {
              [styles.has]: mySubs.find(my => my.plan.product === sub.id && my.active),
              [styles.expired]: mySubs.find(my => my.plan.product === sub.id && !my.active)
            })}
            key={sub.id}
          >
            <HTag size="m" className={sub.unit_label === 'gold' ? styles.gold : ''}>{sub.name}</HTag>
            <p>{sub.description}</p>
            <Button
              disabled={!!mySubs.find(my => my.plan.product === sub.id && my.active)}
              className={sub.unit_label === 'gold' ? styles.gold : ''}
              color={sub.unit_label === 'silver' ? 'ghost' : 'primary'}
              onClick={() => handleChoice(sub)}
            >Pay {formatPrice(sub.price.unit_amount / 100)}</Button>
            {mySubs.find(my => my.plan.product === sub.id && my.active) && <Card className={styles.subscribed}>
                <HTag>You subscribed!</HTag>
                <Button color="danger" onClick={() => handleSubscriptionCancel(mySubs.find(my => my.plan.product === sub.id).id)}>Cancel Subscription</Button>
              </Card>
            }
          </Card>)
        }
      </div>
    }
    { chosenSub && <form onSubmit={handleSubmit('', handleSubmitSubscription)}>
        <HTag size="m" className={cn(styles.formTitle, {
          [styles.gold]: chosenSub.unit_label === 'gold',
          [styles.silver]: chosenSub.unit_label === 'silver'
        })}>For payment: {chosenSub.description}</HTag>
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