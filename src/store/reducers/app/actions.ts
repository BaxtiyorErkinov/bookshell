import {ISetAlertOpen,AppConstants} from './types';


export const setAppModal = (payload: any):ISetAlertOpen => {
	return {
		type: AppConstants.IS_ALERT_OPEN,
		payload
	}
}