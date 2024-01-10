import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Stack, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { APP_BAR_HEIGHT } from '../constants';
import InquiriesTable from '../components/InquiriesTable';
import { inquiries } from '../mock-data/inquiries';

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
            maxWidth: '95%',
            borderRadius: 2,
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

        <Box sx={{ marginTop: 7 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#4d4d4d' }}>
            Open Inquiries
          </Typography>
          <Typography sx={{ marginBottom: '2vh', color: '#8a8a8a' }}>
            These are the inquiries that are currently open.
          </Typography>
          <InquiriesTable inquiries={inquiries} />
        </Box>
      </Box>
    </Box>
  );
}
