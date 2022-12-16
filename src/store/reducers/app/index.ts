import { IAppState, AppConstants, AppActionType } from './types';

const initialState: IAppState = {
  modal: {
    is_open: false,
    msg: '',
    type: 'success',
  },
};

export const appReducer = (
  state: IAppState = initialState,
  action: AppActionType,
): IAppState => {
  switch (action.type) {
    case AppConstants.IS_ALERT_OPEN:
      return {
        ...state,
        modal: action.payload,
      };
    default:
      return state;
  }
};
