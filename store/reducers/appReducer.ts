import {appActionTypes, IAppActions, IAppAlertOptions, IAppState} from "../store-interfaces/appReducer.interface";
import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {statuses} from "@Constants";
import {generateMetaAndError} from "@Helpers";
import {ExternalActions} from "@ActionCreators/externalActions";

const initialState: IAppState = {
	alerts: [],
	newAlert: {
		id: null,
		options: {
			isAutoDeleted: true,
			toDeleteAllBefore: false,
			toDeleteStream: null,
		}
	},
	loading: false,
	modalConfig: null,
	subProducts: [],
	stripeToken: 'pk_test_51JpUsRHGtSgh6m0CCqMQpncG0FWtJrMw2t2L7RhH0TxmJmdp9JK1HyG1VyI3ONMDzlE0OlZVOwR7JD3ZQazKBuXJ00iREhwXp9'
};

const AppActions = ExternalActions.App;

export const name = 'app';
export const {reducer, actions, caseReducers} = createSlice({
	name, initialState,
	reducers: {
		clearAppAlert: {
			reducer: (state, action) => {
				state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
			},
			prepare: (id: string) => ({payload: id, ...generateMetaAndError()})
		},
		setAllAvailableSubscriptionProducts: (state, action) => {
			state.subProducts = action.payload;
		},
		appLoadingStart: state => {
			state.loading = true;
		},
		appLoadingEnd: state => {
			state.loading = false;
		}
	},
	extraReducers: builder => {
		builder.addCase(AppActions.setAppAlert, (state, action) => {
			state.alerts = state.alerts.length >= 3
				? [...state.alerts.slice(1), {
					message: action.payload.message,
					status: action.payload.status,
					id: action.payload.id
				}]
				: [...state.alerts, {message: action.payload.message, status: action.payload.status, id: action.payload.id}];

			state.newAlert = {
				...state.newAlert,
				options: {...action.payload.options},
				id: action.payload.id
			}
		});

		builder.addCase(AppActions.clearAppAlert, (state, action) => {
			state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
		});

		builder.addCase(AppActions.openModal, (state, action) => {
			state.modalConfig = action.payload;
		});

		builder.addCase(AppActions.closeModal, state => {
			state.modalConfig = null;
		});

		builder.addCase(AppActions.clearAllAlerts, state => {
			state.alerts = [];
		});
	}
});