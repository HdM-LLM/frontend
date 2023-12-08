import React from 'react';
import { Vacancy } from '../types/vacancy';
import { Applicant } from '../types/applicant';
import { Box, Stack, Typography } from '@mui/material';
import { APP_BAR_HEIGHT } from '../constants';
import CustomizedVacancyTables from '../components/CustomizedVacancyTable';
import { mockApplicants } from '../mock-data/applicants';
import { mockVacancies } from '../mock-data/vacancies';
import { Route } from 'react-router-dom';

export interface VacancyDetailsPageProps {
  //receivingDate: string; // TODO: Change this later to Date once the backend and database are connected
  vacancy: Vacancy;
  //applicants: Applicant[];
}

export default function VacancyDetailsPage(props: VacancyDetailsPageProps) {
  const applicants = mockApplicants;
  const vacancy = mockVacancies[0];
  const receivingDate = '1st December 2023';

  return (
    <Box
      sx={{
        flex: 1,
        height: 'calc(100vh - APP_BAR_HEIGHT)',
        marginTop: APP_BAR_HEIGHT,
      }}
    >
      <Stack sx={{ marginLeft: 3, marginTop: 10, pb: 2 }} direction="column">
        <Typography variant="h4" fontWeight={'bold'} sx={{ color: '#4d4d4d' }}>
          {vacancy.vacancyTitle}
        </Typography>
        <Typography variant="h6" sx={{ color: '#4d4d4d' }}>
          IT Department
        </Typography>
      </Stack>
      <Box
        sx={{
          marginLeft: 3,
          marginRight: 3,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      ></Box>
      <Box
        sx={{
          marginLeft: 3,
          marginRight: 3,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box>
          <CustomizedVacancyTables applicants={applicants} receivingDate={receivingDate} />
        </Box>
      </Box>
    </Box>
  );
}
