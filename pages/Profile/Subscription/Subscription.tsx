import React, { FC } from 'react';
import { Button, Card, HTag, Input } from '../../../components';
import { useInput } from '../../../hooks/useInput.hook';
import { SubscriptionProps } from './Subscription.props';

export const Subscription: FC<SubscriptionProps> = () => {
  const { register } = useInput();

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
    <form>
      <Input
        id="number"
        label="Card number:"
        type="text"
        placeholder="Write your card number"
        {...register("card_number", {}, {
          onChangeCallback: handleCardNumberDisplaying
        })}
      />
      <Input
        id="date"
        label="Expiration date:"
        type="text"
        placeholder="Write expiration date of your card"
        {...register("card_date", {}, {
          onChangeCallback: handleCardExpDateDisplaying
        })}
      />
      <Input
        id="csv"
        label="CSV code:"
        type="number"
        placeholder="Write your csv code"
        {...register("card_csv", {}, {
          onChangeCallback: (value) => value.length >=3 ? value.substring(0, 3) : value
        })}
      />
      <Button color="primary">Pay</Button>
    </form>
  </Card>;
};