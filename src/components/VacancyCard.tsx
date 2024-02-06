import React from 'react';
import { Box, Card, Grid, Typography, Chip, Stack } from '@mui/material';
import { Vacancy } from '../types/vacancy';
import { FONT_FAMILY } from '../constants';

/**
 * Represents the properties required to render a VacancyCard component.
 * @typedef {Object} VacancyCardProps
 * @property {Vacancy} vacancy - The vacancy data to display.
 * @property {number} cardWidth - The width of the card.
 * @property {number} cardHeight - The height of the card.
 * @property {number} marginRight - The right margin of the card.
 * @property {number} marginBottom - The bottom margin of the card.
 */
export interface VacancyCardProps {
  vacancy: Vacancy;
  cardWidth: number;
  cardHeight: number;
  marginRight: number;
  marginBottom: number;
}

/**
 * Enum for department types to categorize vacancies.
 * @readonly
 * @enum {string}
 */
export enum Departments {
  HR = 'HR',
  IT = 'IT',
  Sales = 'Sales',
  Marketing = 'Marketing',
  Finance = 'Finance',
  Legal = 'Legal',
  Other = 'Other',
}

/**
 * Functional component for rendering a card that displays vacancy details.
 * It uses department-specific colors for visual differentiation.
 *
 * @param {VacancyCardProps} props - The properties to configure the vacancy card.
 * @returns {JSX.Element} The VacancyCard component.
 */
export default function VacancyCard(props: VacancyCardProps) {
  /**
   * Determines the chip color based on the department.
   * @param {string} department - The department of the vacancy.
   * @returns {string} The hex code for the department's color.
   */
  const getDepartmentChipColor = (department: string) => {
    switch (department) {
      case Departments.HR:
        return '#eee1fa';
      case Departments.IT:
        return '#DEEDE5';
      case Departments.Sales:
        return '#cfd6fa';
      case Departments.Marketing:
        return '#FDF8CE';
      case Departments.Finance:
        return '#fae1e1';
      case Departments.Legal:
        return '#f0e8c2';
      case Departments.Other:
        return '#E7DCF2';
      default:
        return '#F2F2F2'; // Grey as default
    }
  };

  /**
   * Determines the chip text color based on the department.
   * @param {string} department - The department of the vacancy.
   * @returns {string} The hex code for the department's text color.
   */
  const getDepartmentChipTextColor = (department: string) => {
    switch (department) {
      case Departments.HR:
        return '#553b6e';
      case Departments.IT:
        return '#427A5B';
      case Departments.Sales:
        return '#3b446e';
      case Departments.Marketing:
        return '#938406';
      case Departments.Finance:
        return '#8c5a5a';
      case Departments.Legal:
        return '#695f30';
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
                  label={props.vacancy.working_time ? 'Full Time' : 'Part Time'}
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
            {/** TODO: Show name of person that requested this vacancy (functionality in backend currently missing) */}
            <Typography variant="body2" component="div" sx={{ fontFamily: FONT_FAMILY }}>
              Requested by: Manuel Neuer
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
