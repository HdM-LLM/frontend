import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Stack, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function InquiriesPage() {
  return (
    <Box
      component="main"
      sx={{
        flex: 1,
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Stack sx={{ marginLeft: 3, marginTop: 10, pb: 2 }} direction="column">
        <Typography variant="h4" fontWeight={'bold'} sx={{ color: '#4d4d4d' }}>
          Inquiries
        </Typography>
      </Stack>

      <Container maxWidth="xl" sx={{ mt: 1 }}>
        <Box
          sx={{
            width: '100%',
            borderRadius: '10px',
            bgcolor: '#f0f0f0',
            p: 2,
            mb: 2,
          }}
        >
          <Typography variant="h5">Create a new vacancy</Typography>
          <Typography>Create manually a new vacancy</Typography>
          <NavLink to="/vacancy/creation" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
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
            bgcolor: '#f0f0f0',
            p: 2,
            textAlign: 'center',
          }}
        >
          <Typography>Inser Mockup Data here</Typography>
        </Box>
      </Container>
    </Box>
  );
}
