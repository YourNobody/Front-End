import {Subject} from "rxjs";

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