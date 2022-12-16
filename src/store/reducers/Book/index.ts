import { loadavg } from 'os';
import { BookReducerState, rootAction, BookReducerAcn } from './types';

const initialState: BookReducerState = {
  books: [],
  searchedBooks: [],
  loading: false,
  error: '',
};

export const bookReducer = (
  state = initialState,
  action: rootAction,
): BookReducerState => {
  switch (action.type) {
    case BookReducerAcn.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case BookReducerAcn.SET_BOOK:
      return {
        ...state,
        books: action.payload,
      };
    case BookReducerAcn.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case BookReducerAcn.SET_SEARCHED_BOOK:
      return {
        ...state,
        searchedBooks: action.payload,
      };
    default:
      return state;
  }
};
