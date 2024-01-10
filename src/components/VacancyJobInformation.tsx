import React from 'react';
import {
  Box,
  Stack,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material';

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
      <Typography variant="h6" sx={{ marginBottom: '1vh', color: '#8a8a8a' }}>
        Please fill out the following information about the job.
      </Typography>
      {/* Basic information form */}
      <Stack spacing={2}>
        <TextField
          label="Job Name"
          name="jobName"
          value={formData.jobName}
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
            {/* TODO:  Replace with actual department options fetched from backend (Departments should be switched to ENUM in backend and db)*/}
            <MenuItem value="department1">Department 1</MenuItem>
            <MenuItem value="department2">Department 2</MenuItem>
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
        <TextField
          label="Required Skills"
          name="requiredSkills"
          value={formData.requiredSkills}
          onChange={handleChange}
          fullWidth
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
