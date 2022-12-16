import React, { FC } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {
  SelectChangeEvent,
} from '@mui/material/Select';

interface IProps {
  value: string;
  setValue: any;
}

const status = [
  {
    label: 'New',
    value: 0,
  },
  {
    label: 'Reading',
    value: 1,
  },
  {
    label: 'Finished',
    value: 2,
  },
];

const CustomeSelect: FC<IProps> = ({ setValue, value }) => {
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <FormControl
      sx={{
        m: 1,
        minWidth: 120,
        position: 'absolute',
        bottom: '16px',
      }}
      size="small">
      <InputLabel id="status">status</InputLabel>
      <Select
        labelId="status"
        id="status"
        value={value}
        label="status"
        onChange={handleChange}>
        {status.map((el) => (
          <MenuItem value={el.value} key={el.value}>{el.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomeSelect;
