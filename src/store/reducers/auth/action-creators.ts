import { IUser } from '../../../models/IUser';
import {
  AuthActionEnum,
  ResetState,
  SetErrorAction,
  SetLoadingAction,
  SetUserAction,
} from './types';

export const setLoading = (
  param: boolean,
): SetLoadingAction => {
  return {
    type: AuthActionEnum.SET_LOADING,
    payload: param,
  };
};

export const setError = (param: string): SetErrorAction => {
  return {
    type: AuthActionEnum.SET_ERROR,
    payload: param,
  };
};

export const setUser = (param: IUser): SetUserAction => {
  return {
    type: AuthActionEnum.SET_USER,
    payload: param,
  };
};
export const resetState = (): ResetState => {
  return {
    type: AuthActionEnum.RESET_STATE,
  };
};
