import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const SwitcherTwo = ({row}) => {
  const [switchValue, setSwitchValue] = useState(1);

  console.log('row', row)

  const handleSwitchChange = () => {
    const newValue = switchValue === 1 ? 0 : 1;
    setSwitchValue(newValue);
  };

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 30,
    height: 18,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 3,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
    },
  }));

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <AntSwitch checked={switchValue === 1} onChange={() => handleSwitchChange(row, switchValue)} inputProps={{ 'aria-label': 'ant design' }} />
    </div>
  );
};

export default SwitcherTwo;
