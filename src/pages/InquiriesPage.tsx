import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Stack, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { APP_BAR_HEIGHT } from '../constants';

export default function InquiriesPage() {
  return (
    <Box
      component="main"
      sx={{
        flex: 1,
        height: 'calc(100vh - APP_BAR_HEIGHT)',
        marginTop: APP_BAR_HEIGHT,
        marginLeft: 3,
        marginRight: 3,
      }}
    >
      <Stack sx={{ marginTop: 10, pb: 2 }} direction="column">
        <Typography variant="h4" fontWeight={'bold'} sx={{ color: '#4d4d4d' }}>
          Inquiries
        </Typography>
      </Stack>

      <Box sx={{ marginTop: 2, pb: 2 }}>
        <Box
          sx={{
            width: '100%',
            borderRadius: '10px',
            bgcolor: '#f5f5f5',
            p: 2,
            mb: 2,
          }}
        >
          <Typography variant="h5">Create a new vacancy</Typography>
          <Typography>Create a new vacancy from scratch</Typography>
          <NavLink to="/vacancy/creation" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              disableElevation
              color="secondary"
              sx={{ float: 'right', top: '-45px', width: '130px' }}
            >
              Create
            </Button>
          </NavLink>
        </Box>

        <Box
          sx={{
            width: '100%',
            height: '200px',
            borderRadius: '10px',
            bgcolor: '#f5f5f5',
            p: 2,
            textAlign: 'center',
          }}
        >
          <Typography>Insert Mockup Data here</Typography>
        </Box>
      </Box>
    </Box>
  );
}
