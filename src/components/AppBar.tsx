import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CallMergeIcon from '@mui/icons-material/CallMerge';
import { APP_BAR_HEIGHT } from '../constants';
import { useNavigate } from 'react-router-dom';

export default function AppBar() {
  const navigate = useNavigate();

  const AppBarMod = styled(MuiAppBar)(({ theme }) => ({
    background: theme.palette.grey[100],
    boxShadow: 'none',
    position: 'fixed',
    height: theme.spacing(8),
  }));

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 8,
    backgroundColor: theme.palette.grey[100],
    width: '50%',
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    color: 'black',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      color: 'black',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  return (
    <AppBarMod>
      <Toolbar
        sx={{
          ml: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'flex-start',
            ml: -2,
            '&:hover': {
              cursor: 'pointer',
            },
          }}
          onClick={() => {
            navigate('/');
          }}
        >
          <CallMergeIcon
            sx={{
              display: { md: 'flex' },
              mr: 2,
            }}
            color="secondary"
            fontSize="large"
            fontWeight="bold"
          />
          <Typography
            component="h1"
            variant="h4"
            color="secondary"
            noWrap
            sx={{
              mr: 2,
              display: { md: 'flex' },
              fontFamily: 'Lato',
              fontWeight: 'bold',
            }}
          >
            SkillSync
          </Typography>
        </Box>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
        </Search>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'right',
          }}
        >
          <Avatar alt="user" src={'a'} sx={{ p: 0, mr: 2, ml: 2 }} />
          <Typography sx={{ mr: 2, color: 'black' }}>Manuel Neuer</Typography>
          <Badge badgeContent={4} color="secondary" sx={{ ml: 2 }}>
            <NotificationsIcon color="primary" />
          </Badge>
        </Box>
      </Toolbar>
    </AppBarMod>
  );
}
