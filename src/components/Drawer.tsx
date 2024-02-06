import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import DrawerItems from '../helper/DrawerItems';
import { DRAWER_WIDTH } from '../constants';
import { APP_BAR_HEIGHT } from '../constants';

/**
 * Functional component that renders a custom styled Material UI Drawer.
 * The drawer's styling is modified to fit alongside a top app bar, with a fixed position, custom background color,
 * width, and adjusted height to account for the app bar's presence.
 *
 * @returns {JSX.Element} A Material UI Drawer component with custom styling.
 */
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
