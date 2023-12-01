import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import DrawerItems from '../helper/DrawerItems';

export default function Drawer() {
  const DrawerMod = styled(MuiDrawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
      position: 'fixed',
      background: theme.palette.grey[100],
      width: theme.spacing(28),
      marginTop: theme.spacing(8),
    },
  }));

  return (
    <DrawerMod variant="permanent">
      <DrawerItems />
    </DrawerMod>
  );
}
