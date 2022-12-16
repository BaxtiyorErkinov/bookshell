import React from 'react';
import { Backdrop } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const BackdropLoading = () => {
  return (
    <div>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme: any) => theme.zIndex.drawer + 1,
        }}
        open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default BackdropLoading;
