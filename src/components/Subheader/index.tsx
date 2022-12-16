import React, { FC } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

interface SubheaderProps {
  title: string;
}

const SubHeader: FC<SubheaderProps> = ({ title }) => {
  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          component="div"
          fontWeight={600}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default SubHeader;
