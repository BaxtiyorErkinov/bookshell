import React from 'react';
import Login from '../pages/Auth/Login';

const SignUp = React.lazy(() => import('../pages/Auth'));
const Home = React.lazy(() => import('../pages/Home'));

export interface IRoute {
  path: string;
  element: React.ComponentType;
}

export enum AllRoutes {
  SIGNUP = '/signup',
  LOGIN = '/login',
  HOME = '/',
}

export const routesList: IRoute[] = [
  {
    path: AllRoutes.SIGNUP,
    element: SignUp,
  },
  {
    path: AllRoutes.HOME,
    element: Home,
  },
  {
    path: AllRoutes.LOGIN,
    element: Login,
  },
];
