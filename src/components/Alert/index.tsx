import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAppModal } from '../../store/reducers/app/actions';
import { BsFillCloudCheckFill } from 'react-icons/bs';
import { BiErrorCircle } from 'react-icons/bi';
import { MdOutlineClose } from 'react-icons/md';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

import './alert.css';

export interface State extends SnackbarOrigin {
  vertical: 'top';
  horizontal: 'right';
}

export default function PositionedSnackbar() {
  const [state, setState] = React.useState<State>({
    vertical: 'top',
    horizontal: 'right',
  });
  const dispatch = useDispatch();
  const { modal } = useSelector(({ appReducer }) => appReducer);
  const { vertical, horizontal } = state;

  const handleClose = () => {
    dispatch(
      setAppModal({
        type: 'success',
        msg: 'SUCCESSFULLY',
        is_open: false,
      }),
    );
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={modal.is_open}
      onClose={handleClose}
      key={vertical + horizontal}
      autoHideDuration={2000}>
      <Alert
        onClose={handleClose}
        icon={false}
        severity={modal.type || 'success'}
        action={
          <span onClick={handleClose} className="close-btn">
            <MdOutlineClose />
          </span>
        }
        className="alert">
        <span className="alert__main-icon">
          {modal.type === 'success' ? (
            <BsFillCloudCheckFill className="icon success" />
          ) : (
            <BiErrorCircle className="icon error" />
          )}
        </span>
        <span className="text">{modal.msg}</span>
      </Alert>
    </Snackbar>
  );
}
