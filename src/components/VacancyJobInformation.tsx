import React from 'react';
import {
  Box,
  Stack,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { Departments } from '../enums/Departments.enum';
import { WorkingHours } from '../enums/WorkingHours.enum';

export type VacancyJobInformationProps = {
  onNext: () => void;
  formData: {
    title: string;
    department: string;
    tasksAndResponsibilities: string;
    workingHours: string;
    description: string;
    [key: string]: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      department: string;
      tasksAndResponsibilities: string;
      workingHours: string;
      description: string;
    }>
  >;
};

const VacancyJobInformation: React.FC<VacancyJobInformationProps> = ({ formData, setFormData }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDepartmentChange = (event: SelectChangeEvent<string>) => {
    setFormData((prevData) => ({
      ...prevData,
      department: event.target.value as string,
    }));
  };

  const handleWorkingHourChange = (event: SelectChangeEvent<string>) => {
    setFormData((prevData) => ({
      ...prevData,
      workingHours: event.target.value as string,
    }));
  };

  return (
    <Box>
      {/* Basic information form */}
      <Stack spacing={2}>
        <TextField
          label="Job Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          required
        />
        <FormControl fullWidth>
          <InputLabel id="department-label">Department</InputLabel>
          <Select
            labelId="department-label"
            id="department"
            name="department"
            label="Department"
            value={formData.department}
            onChange={handleDepartmentChange}
          >
            <MenuItem value={Departments.FINANCE}>Finance</MenuItem>
            <MenuItem value={Departments.HR}>HR</MenuItem>
            <MenuItem value={Departments.IT}>IT</MenuItem>
            <MenuItem value={Departments.LEGAL}>Legal</MenuItem>
            <MenuItem value={Departments.MARKETING}>Marketing</MenuItem>
            <MenuItem value={Departments.SALES}>Sales</MenuItem>
            <MenuItem value={Departments.OTHER}>Other</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Tasks and Responsibilities"
          name="tasksAndResponsibilities"
          value={formData.tasksAndResponsibilities}
          onChange={handleChange}
          fullWidth
          multiline
          required
        />
        <FormControl fullWidth>
          <InputLabel id="Working Hours">Working Hours</InputLabel>
          <Select
            labelId="workingHours"
            id="workingHours"
            name="workingHours"
            label="workingHours"
            value={formData.workingHours}
            onChange={handleWorkingHourChange}
          >
            <MenuItem value={WorkingHours.FULLTIME}>Full Time</MenuItem>
            <MenuItem value={WorkingHours.PARTTIME}>Part Time</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
        />
        <Typography sx={{ color: '#B3B3B3' }}>
          All fields marked with an asterisk (*) are required fields
        </Typography>
      </Stack>
    </Box>
  );
};

export default VacancyJobInformation;
