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
  Tooltip,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { Departments } from './VacancyCard';

export type VacancyJobInformationProps = {
  onNext: () => void;
  formData: {
    jobName: string;
    department: string;
    tasksAndResponsibilities: string;
    requiredSkills: string;
    workplaceAndWorkingHours: string;
    languageRequirements: string;
    additionalInformation: string;
    [key: string]: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      jobName: string;
      department: string;
      tasksAndResponsibilities: string;
      requiredSkills: string;
      workplaceAndWorkingHours: string;
      languageRequirements: string;
      additionalInformation: string;
    }>
  >;
};

const VacancyJobInformation: React.FC<VacancyJobInformationProps> = ({ formData, setFormData }) => {
  const departments = ['HR', 'IT', 'Sales', 'Marketing', 'Finance', 'Legal', 'Other'];

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

  return (
    <Box>
      <Typography variant="h6" sx={{ color: '#4d4d4d' }}>
        Please enter the basic information about the job
      </Typography>
      {/* Basic information form */}
      <Stack spacing={2}>
        <Tooltip
          arrow
          title="This is the name of the job that will be used to generate the vacancy."
        >
          <TextField
            label="Job Name"
            name="jobName"
            value={formData.jobName}
            onChange={handleChange}
            fullWidth
            required
          />
        </Tooltip>
        <TextField
          id="department"
          name="department"
          label="Department"
          value={handleDepartmentChange}
          required
          fullWidth
          select
        >
          {departments.map((department) => (
            <MenuItem key={department} value={department}>
              {department}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Tasks and Responsibilities"
          name="tasksAndResponsibilities"
          value={formData.tasksAndResponsibilities}
          onChange={handleChange}
          fullWidth
          multiline
          required
        />
        {/* TODO: This should use radio buttons to make a selection */}
        <TextField
          label="Workplace and Working Hours"
          name="workplaceAndWorkingHours"
          value={formData.workplaceAndWorkingHours}
          onChange={handleChange}
          fullWidth
          required
        />
        {/* TODO: Would it be possible to add a skill level selection after entering a language? */}
        {/* TODO: Spoken language or programming language? */}
        <TextField
          label="Language Requirements"
          name="languageRequirements"
          value={formData.languageRequirements}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Additional Information"
          name="additionalInformation"
          value={formData.additionalInformation}
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
