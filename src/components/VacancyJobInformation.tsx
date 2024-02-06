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

/**
 * Type definition for properties required by the VacancyJobInformation component.
 * @typedef {Object} VacancyJobInformationProps
 * @property {() => void} onNext - Callback function to trigger the next step in the vacancy creation process.
 * @property {Object} formData - Data object containing form values for vacancy information.
 * @property {string} formData.title - The title of the vacancy.
 * @property {string} formData.department - The department the vacancy belongs to.
 * @property {string} formData.tasksAndResponsibilities - Tasks and responsibilities associated with the vacancy.
 * @property {string} formData.workingHours - Working hours for the vacancy.
 * @property {string} formData.description - Description of the vacancy.
 * @property {React.Dispatch<React.SetStateAction<Object>>} setFormData - State setter function to update formData.
 */
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

/**
 * Component for capturing and editing basic job information for a vacancy.
 *
 * @param {VacancyJobInformationProps} props - Properties passed to the VacancyJobInformation component.
 * @returns {JSX.Element} - React component for entering and editing basic vacancy job information.
 */
const VacancyJobInformation: React.FC<VacancyJobInformationProps> = ({ formData, setFormData }) => {
  /**
   * Handles changes to input fields and updates the formData state accordingly.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event from the input field.
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /**
   * Specialized handler for changes in the department selection field.
   *
   * @param {SelectChangeEvent<string>} event - The change event from the department select field.
   */
  const handleDepartmentChange = (event: SelectChangeEvent<string>) => {
    setFormData((prevData) => ({
      ...prevData,
      department: event.target.value as string,
    }));
  };

  /**
   * Specialized handler for changes in the working hours selection field.
   *
   * @param {SelectChangeEvent<string>} event - The change event from the working hours select field.
   */
  const handleWorkingHourChange = (event: SelectChangeEvent<string>) => {
    setFormData((prevData) => ({
      ...prevData,
      workingHours: event.target.value as string,
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
            required
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
          required
        />
        <Typography sx={{ color: '#B3B3B3' }}>
          All fields marked with an asterisk (*) are required fields
        </Typography>
      </Stack>
    </Box>
  );
};

export default VacancyJobInformation;
