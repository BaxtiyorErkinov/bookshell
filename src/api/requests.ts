import { AxiosResponse } from 'axios';
import { IAuthItems, IAuthState } from '../models/IAuth';
import { AllBooks, IBook, ICreateBook, ISearchedBooks } from '../models/IBook';
import { md5Generator } from '../utils/md5Generator';
import { base_url } from './constants';
import axiosInstance from './signUpApi';
import axios from './baseApi';
import loginApi from './LoginApi';

const user = JSON.parse(localStorage.getItem('userInfo') || '{}') || {};

enum RequestMethods {
  POST = 'POST',
  GET = 'GET',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export const requests = {
  signUp: async (body: IAuthItems): Promise<AxiosResponse<IAuthState>> => {
    return await axiosInstance.post<IAuthState>('/signup', body);
  },
  getMySelf: async (body: any): Promise<AxiosResponse<IAuthState>> => {
    console.log(
      md5Generator({
        req: 'GET',
        host: base_url,
        endpoint: 'myself',
        body: body,
        secretkey: body.secret,
      }),
    );
    return await loginApi.get('myself', {
      headers: {
        Key: body.key,
        Sign: md5Generator({
          req: 'GET',
          host: base_url,
          endpoint: 'myself',
          body: '',
          secretkey: body.secret,
        }),
      },
    });
  },
  getAllBooks: async (): Promise<AxiosResponse<any>> => {
    return await axios.get('books');
  },
  createBook: async (body: ICreateBook): Promise<AxiosResponse<AllBooks>> => {
    return await axios.post('books', body);
  },
  deleteBook: async (id: number) => {
    return await axios.delete(`books/${id}`);
  },
  getSearchedBook: async (query: string) => {
    return await axios.get(`books/${query}`);
  },
  changeBookStatus: async (
    id: number | undefined,
    body: { book: any; status: number },
  ) => {
    return await axios.patch(`books/${id}`, body);
  },
};
