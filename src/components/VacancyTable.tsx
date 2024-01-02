import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, LinearProgress, Button, Avatar } from '@mui/material';
import { NavLink, useParams } from 'react-router-dom';
import { Applicant } from '../types/applicant';
import { useEffect, useState } from 'react';
import API from '../api/api';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#FFFFFF',
    color: '#4d4d4d',
    fontSize: 20,
    border: 5,
    boxShadow: 0,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    border: 5,
    boxShadow: 0,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f3f3f3',
    boxShadow: 0,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 5,
    boxShadow: 0,
  },
}));

export interface VacancyTableProps {
  applicants: Applicant[];
  receivingDate: string; // TODO: Change this later to Date once the backend and database are connected
}

type ExtApplicant = Applicant & {
  ratingScore: number;
};

export default function VacancyTable(props: VacancyTableProps) {
  const maxProgressBarValue = 10;
  const { vacancy_id } = useParams();
  const [applicants, setApplicants] = useState<ExtApplicant[]>([]);

  const linkStyle = {
    textDecoration: 'none',
  };

  useEffect(() => {
    const fetchRating = async () => {
      try {
        if (!props.applicants) {
          console.error('Error fetching rating: No Applicants provided');
          return;
        }
        if (!vacancy_id) {
          console.error('Error fetching rating: No Vacancy ID provided');
          return;
        }

        const api = API.getAPI();
        let applicantList: ExtApplicant[] = [];
        for (const applicant of props.applicants) {
          const ratings = await api.fetchApplicantRatings(vacancy_id, applicant.id);
          let extApplicant = applicant as ExtApplicant;
          extApplicant.ratingScore = 0;
          for (const rating of ratings) {
            extApplicant.ratingScore += rating.score;
          }
          extApplicant.ratingScore = extApplicant.ratingScore / ratings.length;
          applicantList.push(extApplicant);
        }
        setApplicants(applicantList);
      } catch (error) {
        console.error('Error fetching rating:', error);
      }
    };

    fetchRating();
  }, [props.applicants, vacancy_id]);

  return (
    <TableContainer
      sx={{
        minWidth: '60%',
        maxWidth: '85%',
        flexDirection: 'row',
        borderRadius: 2,
        marginTop: 3,
        marginBottom: 3,
      }}
    >
      <Table aria-label="table with skills and their rating" size="medium">
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ paddingRight: 10 }}>Applicant</StyledTableCell>
            <StyledTableCell sx={{ paddingRight: 15 }}>Rating</StyledTableCell>
            <StyledTableCell>Application received</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applicants.map((applicant) => (
            <StyledTableRow key={applicant.id}>
              <StyledTableCell component="th" scope="row">
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Avatar
                    src={`data:image/png;base64,${applicant.img}`}
                    sx={{
                      width: 55,
                      height: 55,
                      border: 2,
                      borderColor: '#B4CD93',
                      marginRight: 2,
                    }}
                  />
                  {applicant.firstName + ' ' + applicant.lastName}
                </Box>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <LinearProgress
                    variant="determinate"
                    value={(applicant.ratingScore / maxProgressBarValue) * 100}
                    color="secondary"
                    sx={{
                      height: 5,
                      borderRadius: 5,
                      minWidth: '85%',
                      marginRight: 2,
                    }}
                  ></LinearProgress>
                  {applicant.ratingScore}/10
                </Box>
              </StyledTableCell>
              {/** TODO: backend currently does not serve this information */}
              <StyledTableCell>TODO</StyledTableCell>
              <StyledTableCell align="center">
                <NavLink
                  to={'/vacancies/' + vacancy_id + '/applicant/' + applicant.id}
                  style={linkStyle}
                  key={applicant.id}
                >
                  <Button variant="contained" color="secondary" disableElevation>
                    Details
                  </Button>
                </NavLink>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
