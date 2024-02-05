import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Avatar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Applicant } from '../types/applicant';

/**
 * Applies custom styling to TableCell components for both header and body cells.
 */
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

/**
 * Applies custom styling to TableRow components, including zebra striping for rows and hiding the last border.
 */
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

export interface ApplicantsTableProps {
  applicants: Applicant[];
  receivingDate: string; // TODO: Change this later to Date once the backend and database are connected
}

/**
 * Renders a table of applicants using custom styled components.
 * @param {ApplicantsTableProps} props - The properties passed to the ApplicantsTable component.
 */
export default function ApplicantsTable(props: ApplicantsTableProps) {
  const linkStyle = {
    textDecoration: 'none',
  };

  return (
    <TableContainer>
      <Table
        sx={{ minWidth: '60%', maxWidth: '100%', flexDirection: 'row', boxShadow: 0 }}
        aria-label="table with skills and their rating"
        size="medium"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ paddingRight: 10 }}>Name</StyledTableCell>
            {/** TODO: Change this to application date? Would be easier to display */}
            <StyledTableCell sx={{ paddingRight: 15 }}>Applied for</StyledTableCell>
            <StyledTableCell align="center">Contact</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.applicants.map((applicant) => (
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
              {/** TODO: backend currently does not serve this information */}
              <StyledTableCell>TODO</StyledTableCell>
              <StyledTableCell align="center">
                <NavLink to={'/applicant/' + applicant.id} style={linkStyle} key={applicant.id}>
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
