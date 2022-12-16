import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface IProps {
  setActive: any;
}

const ActionBtn: React.FC<IProps> = ({ setActive }) => {
  return (
    <SpeedDial
      ariaLabel="action btn"
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
      }}
      icon={<SpeedDialIcon openIcon={<EditIcon />} />}>
      <SpeedDialAction
        key={'create'}
        icon={<SpeedDialIcon />}
        tooltipTitle={'create'}
        onClick={() =>
          setActive({
            edit: false,
            create: true,
            delete: false,
          })
        }
      />
      <SpeedDialAction
        key={'delete'}
        icon={<DeleteIcon />}
        tooltipTitle={'delete'}
        onClick={() =>
          setActive({
            edit: false,
            create: false,
            delete: true,
          })
        }
      />
    </SpeedDial>
  );
};

export default ActionBtn;
