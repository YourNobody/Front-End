import React, { FC } from 'react';
import styles from './Subscription.module.css';
import { Button, Card, HTag, Input } from '../../../components';
import { useInput } from '../../../hooks/useInput.hook';
import { SubscriptionProps } from './Subscription.props';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import { useActions } from '../../../hooks/useActions.hook';
import { useTypedSelector } from '../../../hooks/useTypedSelector.hook';
import './Subscription.module.css';

const CARD_ELEMENT_OPTIONS = {};

export const Subscription: FC<SubscriptionProps> = () => {
  const { register } = useInput();
  const { getClientSecret, payForSubscription } = useActions();
  const { clientSecret } = useTypedSelector(state => state.user);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = (formData) => {
    if (!stripe || !elements) return;
    getClientSecret(formData.email);
    payForSubscription(stripe, clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: formData.email,
        },
      },
    });
  };

  const handleCardNumberDisplaying = (value: string): string => {
    if (!value) return '';
    let unspacedValue = value.replace(/\s/g, '');
    if (unspacedValue.length >= 16) return value.substring(0, 19);
    if (unspacedValue.length) {
      const groupsAmount = Math.floor(unspacedValue.length / 4);
      if (groupsAmount) {
        let val = '';
        for (let i = 0; i < groupsAmount; i++) {
          val += unspacedValue.substring(0, 0 * 3 + 4) + ' ';
          unspacedValue = unspacedValue.substring(0 * 3 + 4);
          if (i === groupsAmount - 1) {
            val += unspacedValue;
          }
        }
        return val.trim();
      } else return value;
    } else {
      return value;
    }
  };

  const handleCardExpDateDisplaying = (value: string): string => {
    if (!value) return '';
    const unlined = value.replace(/\//g, '');
    const groupsAmount = 2;
    if (unlined.length >= 4 && value.match(/\//)) return value.substring(0, 5);
    if (unlined.length > groupsAmount) {
      return unlined.substring(0, 2) + '/' + unlined.substring(2, unlined.length <= 4 ? unlined.length : 4);
    } else {
      return value;
    }
  };

  return <Card>
    <HTag size="l">Subscription to new opportunities</HTag>
    <p>
      This subscription gives you more opportunities to common user.
      You will get new types of quizzes available for you, and you will have new creation quizzes
    </p>
    <Button color="ghost">Subscribe</Button>
    <form onSubmit={handleSubmit}>
      <Input
        label="Email"
        placeholder="Enter your email"
        {...register('email')}
      />
      <CardElement options={CARD_ELEMENT_OPTIONS} className={styles.cardElement}/>
      <Button color="primary">Pay</Button>
    </form>
  </Card>;
};