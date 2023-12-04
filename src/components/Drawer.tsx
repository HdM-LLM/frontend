import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import DrawerItems from '../helper/DrawerItems';
import { DRAWER_WIDTH } from '../constants';
import { APP_BAR_HEIGHT } from '../constants';

export default function Drawer() {
  const DrawerMod = styled(MuiDrawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
      position: 'fixed',
      background: theme.palette.grey[100],
      width: theme.spacing(DRAWER_WIDTH),
      marginTop: theme.spacing(APP_BAR_HEIGHT),
      height: `calc(100vh - ${APP_BAR_HEIGHT}px)`,
      boxShadow: 'none',
    },
  }));

  return (
    <DrawerMod variant="permanent">
      <DrawerItems />
    </DrawerMod>
  );
}
