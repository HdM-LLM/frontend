import React from 'react';
import { Box, Stack, Typography, TextField } from '@mui/material';

export type VacancyJobInformationsProps = {
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

const VacancyJobInformations: React.FC<VacancyJobInformationsProps> = ({
  onNext,
  formData,
  setFormData,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box>
      {/* Basic information form */}
      <Stack spacing={2}>
        <Typography sx={{ color: '#B3B3B3' }}>
          All fields marked with an asterisk (*) must be filled out
        </Typography>
        <TextField
          label="Job Name"
          name="jobName"
          value={formData.jobName}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Department/Responsibility Area"
          name="department"
          value={formData.department}
          onChange={handleChange}
          fullWidth
          required
        />
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
        <TextField
          label="Workplace and Working Hours"
          name="workplaceAndWorkingHours"
          value={formData.workplaceAndWorkingHours}
          onChange={handleChange}
          fullWidth
          required
        />
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
      </Stack>
    </Box>
  );
};

export default VacancyJobInformations;
