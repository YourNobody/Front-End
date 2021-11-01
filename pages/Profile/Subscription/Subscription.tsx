import React, { FC } from 'react';
import styles from './Subscription.module.css';
import { Button, Card, HTag, Input } from '../../../components';
import { useInput } from '../../../hooks/useInput.hook';
import { SubscriptionProps } from './Subscription.props';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import { useActions } from '../../../hooks/useActions.hook';
import { useTypedSelector } from '../../../hooks/useTypedSelector.hook';
import './Subscription.module.css';

const CARD_ELEMENT_OPTIONS = {
  hidePostalCode: true
};

export const Subscription: FC<SubscriptionProps> = () => {
  const { register, handleSubmit } = useInput();
  const { getClientSecretAndSubscribe, payForSubscription } = useActions();
  const { clientSecret, user: { email } } = useTypedSelector(state => state.user);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmitSubscription = async (formData) => {
    if (!stripe || !elements) return;
    getClientSecretAndSubscribe(stripe, formData.email || email ,{
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        email: email
      },
    });
  };

  return <Card>
    <HTag size="l">Subscription to new opportunities</HTag>
    <p>
      This subscription gives you more opportunities to common user.
      You will get new types of quizzes available for you, and you will have new creation quizzes
    </p>
    <Button color="ghost">Subscribe</Button>
    <form onSubmit={handleSubmit(handleSubmitSubscription)}>
      <Input
        label="Email"
        disabled={!!email}
        placeholder="Enter your email"
        {...register('email', null, {
          initialValue: email
        })}
      />
      <CardElement options={CARD_ELEMENT_OPTIONS} className={styles.cardElement}/>
      <Button color="primary" type="submit">Subscribe</Button>
    </form>
  </Card>;
};