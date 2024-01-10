import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import VacancyCard from '../components/VacancyCard';
import { Vacancy } from '../types/vacancy';
import API from '../api/api';
import { APP_BAR_HEIGHT } from '../constants';
import { Grid, Stack, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

export interface VacancyPageProps {
  cardWidth: number;
  cardHeight: number;
}

export default function VacancyPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const vacanciesPerPage = 15;

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const api = API.getAPI();
        const vacancyData = await api.fetchVacancies();
        setVacancies(vacancyData);
        console.log(vacancyData);
      } catch (error) {
        console.error('Error fetching vacancies:', error);
      }
    };

    fetchVacancies();
  }, []);

  const indexOfLastVacancy = currentPage * vacanciesPerPage;
  const indexOfFirstVacancy = indexOfLastVacancy - vacanciesPerPage;
  const currentVacancies = vacancies.slice(indexOfFirstVacancy, indexOfLastVacancy);

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
            {vacancies.length}
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
            <NavLink to={`/vacancies/${vacancy.id}`} style={linkStyle} key={vacancy.id}>
              <Grid item>
                <VacancyCard
                  vacancy={vacancy}
                  cardWidth={400}
                  cardHeight={250}
                  marginRight={2}
                  marginBottom={2}
                />
              </Grid>
            </NavLink>
          ))}
        </Grid>
        <Pagination
          count={Math.ceil(vacancies.length / vacanciesPerPage)}
          color="secondary"
          page={currentPage}
          onChange={handlePageChange}
          sx={{ marginTop: '2vh', marginBottom: '2vh' }}
        />
      </Box>
    </Box>
  );
}
