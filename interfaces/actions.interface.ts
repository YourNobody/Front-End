import {Subject} from "rxjs";
import {Stripe, StripeCardElement} from '@stripe/stripe-js';
import {CardElement} from '@stripe/react-stripe-js';

type TPaymentOption = 'card';

export interface IAppAlertOptions {
	isAutoDeleted?: boolean;
	toDeleteStream?: Subject<{ readyToDelete: boolean }>;
	toDeleteAllBefore?: boolean;
}

export interface IAppOpenModalConfig {
	actionFunc: (...params: any[]) => any;
	actionButtonName: string;
	modalQuestion: string;
	closeButtonName?: string;
	closeFunc?: (...params: any[]) => any;
}

export interface IAppBeforeConfirmConfig {
	payment_method: string;
	priceId: string;
}

export interface IAppStripePaymentMethod {
	type: TPaymentOption;
	card: StripeCardElement;
	billing_details: {
		email: string;
	};
}

export interface IAppStripeSubscriptionProcessConfig {
	priceId: string;
	stripe: Stripe;
	method: IAppStripePaymentMethod;
}