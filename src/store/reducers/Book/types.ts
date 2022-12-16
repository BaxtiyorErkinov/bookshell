import {
  IBook,
  ISearchedBooks,
} from '../../../models/IBook';

export interface BookReducerState {
  loading: boolean;
  error: string;
  books: IBook[] | [];
  searchedBooks: IBook[] | [];
}

export enum BookReducerAcn {
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  SET_BOOK = 'SET_BOOK',
  SET_SEARCHED_BOOK = 'SET_SEARCHED_BOOK',
}

export interface SetLoadingAcn {
  type: BookReducerAcn.SET_LOADING;
  payload: boolean;
}
export interface SetErrorAcn {
  type: BookReducerAcn.SET_ERROR;
  payload: string;
}
export interface SetBookAcn {
  type: BookReducerAcn.SET_BOOK;
  payload: IBook[];
}
export interface SetSearchedBooksAcn {
  type: BookReducerAcn.SET_SEARCHED_BOOK;
  payload: IBook[];
}

export type rootAction =
  | SetLoadingAcn
  | SetErrorAcn
  | SetBookAcn
  | SetSearchedBooksAcn;
