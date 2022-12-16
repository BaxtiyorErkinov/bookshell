import { IUser } from '../../../models/IUser';
import { AuthAction, AuthActionEnum, IAuth } from './types';

const initialState: IAuth = {
  isLoading: false,
  user: {} as IUser,
  error: '',
};

export const authReducer = (
  state = initialState,
  action: AuthAction,
): IAuth => {
  switch (action.type) {
    case AuthActionEnum.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case AuthActionEnum.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case AuthActionEnum.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case AuthActionEnum.RESET_STATE:
      return {
        isLoading: false,
        user: {} as IUser,
        error: '',
      };
    default:
      return state;
  }
};
