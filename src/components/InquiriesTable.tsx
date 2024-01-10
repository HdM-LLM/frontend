import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Chip, Typography } from '@mui/material';
import { Inquiry } from '../types/inquiry';
import { FONT_FAMILY } from '../constants';
import { Departments } from './VacancyCard';

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
  // Get chip color based on department that is fed in
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

  // Get chip text color based on department that is fed in
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
    <TableContainer>
      <Table
        sx={{ minWidth: '60%', maxWidth: '95%', flexDirection: 'row', boxShadow: 0 }}
        aria-label="table with skills and their rating"
        size="medium"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>Position</StyledTableCell>
            <StyledTableCell>Requested by</StyledTableCell>
            <StyledTableCell>Department</StyledTableCell>
            <StyledTableCell>Requested for</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.inquiries.map((inquiry) => (
            <StyledTableRow key={inquiry.id}>
              <StyledTableCell component="th" scope="row">
                <Typography>{inquiry.positionTitle}</Typography>
              </StyledTableCell>
              <StyledTableCell>
                {inquiry.requester.firstName} {inquiry.requester.lastName}
              </StyledTableCell>
              <StyledTableCell>
                <Chip
                  label={inquiry.requester.department}
                  sx={{
                    fontFamily: FONT_FAMILY,
                    fontWeight: 'bold',
                    color: getDepartmentChipTextColor(inquiry.requester.department),
                    backgroundColor: getDepartmentChipColor(inquiry.requester.department),
                    borderRadius: 2,
                  }}
                ></Chip>
              </StyledTableCell>
              <StyledTableCell>
                {inquiry.publishOn.getDate().toString().padStart(2, '0')}.
                {(inquiry.publishOn.getMonth() + 1).toString().padStart(2, '0')}.
                {inquiry.publishOn.getFullYear()}
              </StyledTableCell>
              <StyledTableCell align="right">
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
