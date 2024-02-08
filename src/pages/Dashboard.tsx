import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ErrorDialog from '../components/ErrorDialog';
import { Box, Stack, Typography } from '@mui/material';
import { APP_BAR_HEIGHT } from '../constants';
import ApplicantsTable from '../components/ApplicantsTable';
import { useEffect, useState } from 'react';
import API from '../api/api';
import { Applicant } from '../types/applicant';

/**
 * This page displays the dashboard containing charts and tables.
 * @returns A page displaying the dashboard.
 */
export default function Dashboard() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const receivingDate = '1st December 2023'; // Define receivingDate

  useEffect(() => {
    /**
     * Fetches all applicants from the API.
     */
    const fetchAllApplicants = async () => {
      try {
        const api = API.getAPI();
        const allApplicants = await api.fetchApplicants();
        setApplicants(allApplicants);
      } catch (error) {
        console.error('Error fetching all applicants:', error);
      }
    };

    fetchAllApplicants();
  }, []);

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
          Dashboard
        </Typography>
      </Stack>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          ></Paper>
        </Grid>
        {/* Recent Applications */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          ></Paper>
        </Grid>
        {/* Recent Applicants */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', marginBottom: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#4d4d4d' }}>
              Recent Applicants
            </Typography>
            <Typography sx={{ marginBottom: '2vh', color: '#8a8a8a' }}>
              These are the applicants that have recently applied.
            </Typography>
            <ApplicantsTable applicants={applicants} receivingDate={receivingDate} />
          </Paper>
        </Grid>
      </Grid>
      <ErrorDialog errorCode={404} errorMessage="Page not found." />
    </Box>
  );
}
