import React, { FC } from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';
import MainLayout from '../../layout/mainLayout';
import {
  AllRoutes,
  IRoute,
  routesList,
} from '../../router';

const AppRouter: FC = () => {

  return (
    <div>
      <Routes>
        <Route element={<MainLayout />}>
          {routesList.map((route: IRoute) => (
            <Route
              path={route.path}
              element={<route.element />}
              key={route.path}
            />
          ))}
        </Route>
      </Routes>
    </div>
  );
};

export default AppRouter;
