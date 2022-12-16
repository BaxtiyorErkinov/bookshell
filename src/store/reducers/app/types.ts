export interface IAppState {
	modal: {
		is_open: boolean;
		msg: string;
		type: string;
	}
}

export enum AppConstants {
	IS_ALERT_OPEN = "IS_ALERT_OPEN"
}

export interface ISetAlertOpen {
	type: AppConstants.IS_ALERT_OPEN,
	payload: any
}

export type AppActionType = ISetAlertOpen