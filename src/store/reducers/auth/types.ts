import { IUser } from '../../../models/IUser';

export interface IAuth {
  isLoading: boolean;
  user: IUser;
  error: string;
}

export enum AuthActionEnum {
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  SET_USER = 'SET_USER',
  RESET_STATE = 'RESET_STATE',
}

export interface SetLoadingAction {
  type: AuthActionEnum.SET_LOADING;
  payload: boolean;
}

export interface SetErrorAction {
  type: AuthActionEnum.SET_ERROR;
  payload: string;
}

export interface SetUserAction {
  type: AuthActionEnum.SET_USER;
  payload: IUser;
}

export interface ResetState {
  type: AuthActionEnum.RESET_STATE;
}

export type AuthAction =
  | SetLoadingAction
  | SetErrorAction
  | SetUserAction
  | ResetState;
