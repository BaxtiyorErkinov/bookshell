import {
  IBook,
  ISearchedBooks,
} from '../../../models/IBook';
import {
  BookReducerAcn,
  SetBookAcn,
  SetErrorAcn,
  SetLoadingAcn,
  SetSearchedBooksAcn,
} from './types';

export const setLoading = (
  payload: boolean,
): SetLoadingAcn => {
  return {
    type: BookReducerAcn.SET_LOADING,
    payload: payload,
  };
};
export const setError = (payload: string): SetErrorAcn => {
  return {
    type: BookReducerAcn.SET_ERROR,
    payload: payload,
  };
};
export const setBook = (payload: IBook[]): SetBookAcn => {
  return {
    type: BookReducerAcn.SET_BOOK,
    payload: payload,
  };
};

export const setSearchedBook = (
  payload: IBook[],
): SetSearchedBooksAcn => {
  return {
    type: BookReducerAcn.SET_SEARCHED_BOOK,
    payload: payload,
  };
};
