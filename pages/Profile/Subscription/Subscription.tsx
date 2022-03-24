import React, { FC, useEffect, useState } from 'react';
import styles from './Subscription.module.scss';
import './Stripe.scss';
import { Button, Card, HTag, Input } from '@Components';
import { SubscriptionProps } from './Subscription.props';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import { useActions, useTypedSelector } from '@Hooks';
import { formatPrice } from '@Helpers';
import cn from 'classnames';
import {useForm} from "react-hook-form";

const CARD_ELEMENT_OPTIONS = {
  hidePostalCode: true
};

export const Subscription: FC<SubscriptionProps> = ({className, ...props}) => {
  const { handleSubmit, register } = useForm();
  const { getAllAvailableSubscriptionsProducts, getSelfSubscriptions, cancelSubscription } = useActions();
  const { loading, subscriptions: mySubs, user } = useTypedSelector(state => state.user);
  const { subProducts, loading: loadingApp } = useTypedSelector(state => state.app);
  const [ chosenSub, setChosenSub ] = useState<any>(subProducts[0]);
  const stripe = useStripe();
  const elements = useElements();
  //
  useEffect(() => {
    getAllAvailableSubscriptionsProducts();
    getSelfSubscriptions();
  }, []);
  //
  const handleChoice = (sub: any) => {
    setChosenSub(sub);
  };

  const handleSubscriptionCancel = (subId: string) => {
    cancelSubscription(subId);
  };

  const handleSubmitSubscription = async (formData) => {
    console.log('fd: ', formData);
    // if (!stripe || !elements) return;
    // getClientSecretAndSubscribe(chosenSub.price.id, stripe, email ,{
    //   type: 'card',
    //   card: elements.getElement(CardElement),
    //   billing_details: { email },
    // });
  };

  if (loadingApp || loading) return <Card {...props} className={cn(className, styles.loadingCard)}>
    <HTag size="m" className={styles.loadingTitle}>Load subscriptions info...</HTag>
  </Card>;
  return <Card {...props} className={cn(className, styles.subscriptionWrapper)}>
    <HTag size="l" className={styles.subTitle}>Subscription to new opportunities</HTag>
    {
      subProducts.length && <div className={styles.allSubs}>
        {
          subProducts.map(sub => <Card
            className={cn(styles.sub, {
              [styles.has]: mySubs.find(my => my.plan.product === sub.id && my.active),
              [styles.expired]: mySubs.find(my => my.plan.product === sub.id && !my.active)
            })}
            key={sub.id}
          >
            <HTag size="m" className={styles.title}>{sub.name}</HTag>
            <p>{sub.description}</p>
            {
              mySubs.find(my => my.plan.product === sub.id && my.active)
                ? <>
                    <HTag>You subscribed!</HTag>
                    <Button color="danger" onClick={() => handleSubscriptionCancel(mySubs.find(my => my.plan.product === sub.id).id)}>Cancel Subscription</Button>
                  </>
                : <Button
                  disabled={!!mySubs.find(my => my.plan.product === sub.id && my.active)}
                  className={sub.unit_label && styles[sub.unit_label.toString()]}
                  color={sub.unit_label && sub.unit_label.toString()}
                  onClick={() => handleChoice(sub)}
                >Pay {formatPrice(sub.price.unit_amount / 100)}</Button>
            }
            {/*<Button*/}
            {/*  disabled={!!mySubs.find(my => my.plan.product === sub.id && my.active)}*/}
            {/*  className={sub.unit_label === 'gold' ? styles.gold : ''}*/}
            {/*  color={sub.unit_label === 'silver' ? 'ghost' : 'primary'}*/}
            {/*  onClick={() => handleChoice(sub)}*/}
            {/*>Pay {formatPrice(sub.price.unit_amount / 100)}</Button>*/}
            {/*{mySubs.find(my => my.plan.product === sub.id && my.active) && <Card className={styles.subscribed}>*/}
            {/*    <HTag>You subscribed!</HTag>*/}
            {/*    /!*<Button color="danger" onClick={() => handleSubscriptionCancel(mySubs.find(my => my.plan.product === sub.id).id)}>Cancel Subscription</Button>*!/*/}
            {/*  </Card>*/}
            {/*}*/}
          </Card>)
        }
      </div>
    }
    { chosenSub && <form onSubmit={handleSubmit(handleSubmitSubscription)} className={styles.paySub}>
        <HTag size="m" className={cn(styles.formTitle, {
          [styles.gold]: chosenSub.unit_label === 'gold',
          [styles.silver]: chosenSub.unit_label === 'silver'
        })}>For payment: {chosenSub.description}</HTag>
        <Input
          label="Email"
          placeholder="Enter your email"
          {...register('email', {
            value: user.email
          })}
        />
        <CardElement options={CARD_ELEMENT_OPTIONS} className={styles.cardElement}/>
        <Button
          color={chosenSub.unit_label && chosenSub.unit_label.toString()}
          className={chosenSub.unit_label && styles[chosenSub.unit_label.toString()]}
          type="submit"
        >Subscribe for {formatPrice(chosenSub.price.unit_amount / 100)}</Button>
      </form>
    }
  </Card>;
};