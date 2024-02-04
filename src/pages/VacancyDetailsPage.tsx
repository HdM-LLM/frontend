import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Vacancy } from '../types/vacancy';
import { Box, Stack, Typography } from '@mui/material';
import { APP_BAR_HEIGHT } from '../constants';
import VacancyTable from '../components/VacancyTable';
import API from '../api/api';
import { Applicant } from '../types/applicant';

export default function VacancyDetailsPage() {
  const { vacancy_id } = useParams();
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const receivingDate = '1st December 2023';

  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        if (!vacancy_id) {
          console.error('Error fetching vacancy: No ID provided');
          return;
        }
        // fetch vacancy data
        const api = API.getAPI();
        const vacancyData = await api.fetchVacancy(vacancy_id);
        setVacancy(vacancyData);

        // Assuming you have an API method like getApplicantsByVacancyId
        const applicantsData = await api.fetchApplicantsByVacancyId(vacancy_id);
        setApplicants(applicantsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchVacancy();
  }, [vacancy_id]);

  if (!vacancy) {
    return null;
  }

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
          {vacancy.title}
        </Typography>
        <Typography variant="h6" sx={{ color: '#4d4d4d' }}>
          {vacancy.department}
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
          {applicants.length === 0 ? (
            <Typography variant="h6" sx={{ color: '#4d4d4d' }}>
              No applications received yet
            </Typography>
          ) : (
            <VacancyTable applicants={applicants} receivingDate={receivingDate} />
          )}
        </Box>
      </Box>
    </Box>
  );
}
