import React from 'react';
import { Box, Card, Grid, Typography, Chip, Stack } from '@mui/material';
import { Vacancy } from '../types/vacancy';
import { FONT_FAMILY } from '../constants';

export interface VacancyCardProps {
  vacancy: Vacancy;
  cardWidth: number;
  cardHeight: number;
  marginRight: number;
  marginBottom: number;
}

enum Departments {
  HR = 'HR',
  IT = 'IT',
  Sales = 'Sales',
  Marketing = 'Marketing',
  Finance = 'Finance',
  Other = 'Other',
}

export default function VacancyCard(props: VacancyCardProps) {
  // Get chip color based on department that is fed in
  const getDepartmentChipColor = (department: string) => {
    switch (department) {
      case Departments.HR:
        return '#EDDEDE';
      case Departments.IT:
        return '#DEEDE5';
      case Departments.Sales:
        return '#DEDFED';
      case Departments.Marketing:
        return '#FDF8CE';
      case Departments.Finance:
        return '#F2DCF1';
      case Departments.Other:
        return '#E7DCF2';
      default:
        return '#F2F2F2'; // Grey as default
    }
  };

  // Get chip text color based on department that is fed in
  const getDepartmentChipTextColor = (department: string) => {
    switch (department) {
      case Departments.HR:
        return '#7A4242';
      case Departments.IT:
        return '#427A5B';
      case Departments.Sales:
        return '#42527A';
      case Departments.Marketing:
        return '#938406';
      case Departments.Finance:
        return '#3498DB';
      case Departments.Other:
        return '#68427A';
      default:
        return '#4d4d4d'; // Grey as default
    }
  };

  return (
    <Box>
      <Card
        variant="outlined"
        sx={{
          width: props.cardWidth,
          height: props.cardHeight,
          marginRight: props.marginRight,
          marginBottom: props.marginBottom,
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          backgroundColor: '#f5f5f5',
          '&:hover': {
            backgroundColor: '#edf5e1',
            cursor: 'pointer',
          },
          borderRadius: 3,
          border: '1px solid #f5f5f5',
        }}
      >
        <Grid
          container
          direction={'column'}
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'column',
          }}
        >
          <Grid item>
            <Typography
              variant="h6"
              component="div"
              sx={{
                color: '#4d4d4d',
                fontWeight: 'bold',
                fontFamily: FONT_FAMILY,
                paddingBottom: 0.5,
              }}
            >
              {props.vacancy.title}
            </Typography>
          </Grid>
          <Grid item sx={{ paddingBottom: '1vh' }} alignItems={'row'}>
            <Stack direction="row" spacing={1}>
              <Chip
                label={props.vacancy.department + ' Department'}
                sx={{
                  fontFamily: FONT_FAMILY,
                  fontWeight: 'bold',
                  color: getDepartmentChipTextColor(props.vacancy.department),
                  backgroundColor: getDepartmentChipColor(props.vacancy.department),
                  borderRadius: 2,
                }}
                component={'div'}
              />
              <Grid item sx={{ paddingBottom: '1vh' }}>
                <Chip
                  label={props.vacancy.fullTime ? 'Full Time' : 'Part Time'}
                  sx={{ fontFamily: FONT_FAMILY, borderRadius: 2 }}
                />
              </Grid>
            </Stack>
          </Grid>
          <Grid item sx={{ paddingBottom: '1vh' }}>
            <Typography variant="body2" component="div" sx={{ fontFamily: FONT_FAMILY }}>
              {props.vacancy.description.length > 140
                ? props.vacancy.description.substring(0, 140) + '...'
                : props.vacancy.description}
            </Typography>
          </Grid>
          <Grid item sx={{ paddingBottom: '1vh' }}>
            {/** TODO: Show number of received applications (functionality in backend currently missing) */}
            <Typography variant="body2" component="div" sx={{ fontFamily: FONT_FAMILY }}>
              Applications received: TODO
            </Typography>
          </Grid>
          <Grid item sx={{ paddingBottom: '1vh' }}>
            {/** TODO: Show name of person that requested this vacancy (functionality in backend currently missing) */}
            <Typography variant="body2" component="div" sx={{ fontFamily: FONT_FAMILY }}>
              Requested by: TODO
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
