import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

// not yet implemented
export default function SettingsPage() {
  return (
    <Box
      component="main"
      sx={{
        flex: 1,
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
        <h1>SettingsPage</h1>
      </Container>
    </Box>
  );
}
