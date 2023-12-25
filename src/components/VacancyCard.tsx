import React from 'react';
import { Box, Card, Grid, Typography, Chip } from '@mui/material';
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
  const getChipColor = (department: string) => {
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
              sx={{ color: '#4d4d4d', fontWeight: 'bold', fontFamily: FONT_FAMILY }}
            >
              {props.vacancy.title}
            </Typography>
          </Grid>
          <Grid item>
            <Chip
              label={props.vacancy.department + ' Department'}
              sx={{
                fontFamily: FONT_FAMILY,
                backgroundColor: getChipColor(props.vacancy.department),
                borderRadius: 2,
              }}
              component={'div'}
            />
          </Grid>
        </Grid>
        <Typography variant="body2" component="div" sx={{ fontFamily: FONT_FAMILY }}>
          {props.vacancy.fullTime ? 'Full Time' : 'Part Time'}
        </Typography>
        <Typography variant="body2" component="div" sx={{ fontFamily: FONT_FAMILY }}>
          {props.vacancy.description.length > 130
            ? props.vacancy.description.substring(0, 130) + '...'
            : props.vacancy.description}
        </Typography>
        <Typography variant="body2" component="div" sx={{ fontFamily: FONT_FAMILY }}>
          Last updated: {props.vacancy.updatedAt}
        </Typography>
      </Card>
    </Box>
  );
}
