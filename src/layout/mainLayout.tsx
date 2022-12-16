import React from 'react';
import { Outlet } from 'react-router-dom';
import { AllRoutes } from '../router';
import { setUser } from '../store/reducers/auth/action-creators';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import Snow from '../components/Snow';
import BackdropLoading from '../components/Backdrop';
import { useTypedSelector } from '../utils/hooks/useTypedSelector';
import Alert from '../components/Alert';

const MainLayout = () => {
  const { pathname } = useLocation();
  const { modal } = useSelector(({ appReducer }) => appReducer);
  console.log(modal);
  const isAuth = localStorage.getItem('auth');
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}') || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (userInfo) {
      const parsedItem = userInfo;
      if (parsedItem) {
        dispatch(setUser(parsedItem));
      }
    } else {
      navigate(AllRoutes.SIGNUP);
    }
  }, []);
  return (
    <>
      <div>
        <Snow />
        <Header />
        {modal.is_open ? <Alert /> : null}
      </div>
      <React.Suspense fallback={<BackdropLoading />}>
        <Outlet />
      </React.Suspense>
    </>
  );
};

export default MainLayout;
