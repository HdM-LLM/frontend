import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import VacancyCard from '../components/VacancyCard';
import { Vacancy } from '../types/vacancy';
import { mockVacancies } from '../mock-data/vacancies';
import { APP_BAR_HEIGHT } from '../constants';
import { Grid, Stack, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

export interface VacancyPageProps {
  vacancies: Vacancy[];
  cardWidth: number;
  cardHeight: number;
}

export default function VacancyPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const vacanciesPerPage = 15;

  const indexOfLastVacancy = currentPage * vacanciesPerPage;
  const indexOfFirstVacancy = indexOfLastVacancy - vacanciesPerPage;
  const currentVacancies = mockVacancies.slice(indexOfFirstVacancy, indexOfLastVacancy);

  const linkStyle = {
    textDecoration: 'none',
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Box
      sx={{
        flex: 1,
        height: 'calc(100vh - APP_BAR_HEIGHT)',
        marginTop: APP_BAR_HEIGHT,
        flexDirection: 'column',
      }}
    >
      <Stack sx={{ marginLeft: 3, marginTop: 10, pb: 2 }} direction="column">
        <Typography variant="h4" fontWeight={'bold'} sx={{ color: '#4d4d4d' }}>
          Vacancies
        </Typography>
        <Typography variant="h6" sx={{ color: '#4d4d4d' }}>
          Currently open positions:{' '}
          <Typography variant="h6" fontWeight={'bold'} sx={{ color: '#B4CD93' }} component="span">
            {mockVacancies.length}
          </Typography>{' '}
        </Typography>
      </Stack>
      <Box
        sx={{
          marginLeft: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Grid
          container
          spacing={2}
          direction="row"
          sx={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
            marginTop: 1,
          }}
        >
          {currentVacancies.map((vacancy) => (
            <NavLink to={'/vacancy/' + vacancy.id} style={linkStyle}>
              <Grid item key={vacancy.id}>
                <VacancyCard
                  vacancy={vacancy}
                  cardWidth={350}
                  cardHeight={180}
                  marginRight={2}
                  marginBottom={2}
                />
              </Grid>
            </NavLink>
          ))}
        </Grid>
        <Pagination
          count={Math.ceil(mockVacancies.length / vacanciesPerPage)}
          color="secondary"
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
