import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, LinearProgress, TextField } from '@mui/material';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#FFFFFF',
    color: '#4d4d4d',
    fontSize: 20,
    border: 5,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    border: 5,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f3f3f3',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 5,
  },
}));

function createCategoryData(
  category: string,
  rating: number,
  justification: string,
  quote: string,
  weight: number
) {
  return { category, rating, justification, quote, weight };
}

const rowsMockData = [
  createCategoryData(
    'Coding Experience',
    4.5,
    'Despite having completed an IT internship, the applicant still lacks a broad range of experience. Nevertheless, their interest and active engagement with computers demonstrate a willingness to gain experience and continue to develop.',
    '"I completed the basic programming course during my bachelors degree."',
    70
  ),
  createCategoryData(
    'Framework Knowledge',
    6.5,
    'His knowledge in common Java frameworks is very limited, but he covers the ones that are most important to us.',
    '"However, over the last two years, I intensively worked with Java Spring Boot."',
    30
  ),
];

export default function CustomizedTables() {
  const maxProgressBarValue = 10;

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: '60%', maxWidth: '85%', flexDirection: 'row' }}
        aria-label="table with skills and their rating"
        size="medium"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ paddingRight: 15 }}>Category</StyledTableCell>
            <StyledTableCell sx={{ paddingRight: 15 }}>Rating</StyledTableCell>
            <StyledTableCell>Justification</StyledTableCell>
            <StyledTableCell>Quote</StyledTableCell>
            <StyledTableCell>Weight</StyledTableCell>
            <StyledTableCell>Adjust Rating</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsMockData.map((row) => (
            <StyledTableRow key={row.category}>
              <StyledTableCell component="th" scope="row">
                {row.category}
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
                    value={(row.rating / maxProgressBarValue) * 100}
                    color="secondary"
                    sx={{
                      height: 5,
                      borderRadius: 5,
                      minWidth: '85%',
                      marginRight: 2,
                    }}
                  ></LinearProgress>
                  {row.rating}
                </Box>
              </StyledTableCell>
              <StyledTableCell>{row.justification}</StyledTableCell>
              <StyledTableCell>{row.quote}</StyledTableCell>
              {/** TODO: If needed, weight functionality could be implemented. Maybe the user could make adjustments to weights instead of the AI ratings? */}
              <StyledTableCell align="center">{row.weight} %</StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  id="outlined-rating-adjustment"
                  type="number"
                  defaultValue={row.rating}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
