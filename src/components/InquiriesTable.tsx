import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Typography } from '@mui/material';
import { Inquiry } from '../types/inquiry';

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

export interface InquiriesTableProps {
  inquiries: Inquiry[];
}

export default function InquiriesTable(props: InquiriesTableProps) {
  return (
    <TableContainer>
      <Table
        sx={{ minWidth: '60%', maxWidth: '95%', flexDirection: 'row', boxShadow: 0 }}
        aria-label="table with skills and their rating"
        size="medium"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ paddingRight: 10 }}>Draft Title</StyledTableCell>
            <StyledTableCell sx={{ paddingRight: 7 }}>Requested by</StyledTableCell>
            <StyledTableCell>Department</StyledTableCell>
            <StyledTableCell>Publication Date</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.inquiries.map((inquiry) => (
            <StyledTableRow key={inquiry.id}>
              <StyledTableCell component="th" scope="row">
                <Typography fontWeight={'bold'}>{inquiry.positionTitle}</Typography>
              </StyledTableCell>
              <StyledTableCell>
                {inquiry.requester.firstName} {inquiry.requester.lastName}
              </StyledTableCell>
              <StyledTableCell>{inquiry.requester.department}</StyledTableCell>
              <StyledTableCell>{inquiry.publishOn.toLocaleDateString()}</StyledTableCell>
              <StyledTableCell>
                <Button variant="contained" disableElevation color="secondary">
                  View
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
