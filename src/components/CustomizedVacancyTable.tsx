import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, LinearProgress, Button, Avatar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Applicant } from '../types/applicant';
import { Skill } from '../types/skill';

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

export default function CustomizedTables(props: VacancyTableProps) {
  const maxProgressBarValue = 10;
  const applicants = props.applicants;
  const receivingDate = props.receivingDate;

  const linkStyle = {
    textDecoration: 'none',
  };

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: '60%', maxWidth: '85%', flexDirection: 'row', boxShadow: 0 }}
        aria-label="table with skills and their rating"
        size="medium"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ paddingRight: 15 }}>Applicant</StyledTableCell>
            <StyledTableCell sx={{ paddingRight: 15 }}>Rating</StyledTableCell>
            <StyledTableCell>Skills</StyledTableCell>
            <StyledTableCell>Application receipt</StyledTableCell>
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
                    src={'https://thispersondoesnotexist.com/'}
                    sx={{
                      width: 35,
                      height: 35,
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
                    value={(applicant.rating / maxProgressBarValue) * 100}
                    color="secondary"
                    sx={{
                      height: 5,
                      borderRadius: 5,
                      minWidth: '85%',
                      marginRight: 2,
                    }}
                  ></LinearProgress>
                  {applicant.rating}
                </Box>
              </StyledTableCell>
              <StyledTableCell>{applicant.skills.map((skill) => skill.category)}</StyledTableCell>
              <StyledTableCell>{applicant.id}</StyledTableCell>
              <StyledTableCell align="center">
                <NavLink
                  to={'/applicantDetails/' + applicant.id}
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
