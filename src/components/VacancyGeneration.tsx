import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import {
  Box,
  TextField,
  Button,
  Backdrop,
  Typography,
  Stack,
  Chip,
  IconButton,
} from '@mui/material';
import { Category } from '../types/category';
import { VacancyJobInformationProps } from './VacancyJobInformation';
import API from '../api/api';
import LinearProgress from '@mui/material/LinearProgress';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface VacancyGenerationProps {
  selectedCategories: Category[];
  basicInformation: VacancyJobInformationProps['formData'];
  generatedVacancy: string;
  adjustPromptPart2: string;
  output: string;
  setGeneratedVacancy: React.Dispatch<React.SetStateAction<string>>;
  setAdjustPromptPart2: React.Dispatch<React.SetStateAction<string>>;
  setOutput: React.Dispatch<React.SetStateAction<string>>;
  onSaveVacancy: () => void; // Add the prop function
}

const VacancyGeneration: React.FC<VacancyGenerationProps> = ({
  selectedCategories,
  basicInformation,
  generatedVacancy,
  adjustPromptPart2,
  output,
  setGeneratedVacancy,
  setAdjustPromptPart2,
  setOutput,
  onSaveVacancy,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleGenerateVacancy = () => {
    const adjustedPrompt = `${adjustPromptPart2}`;
    setOpen(true);

    API.getAPI()
      .generateVacancy(basicInformation, selectedCategories, adjustedPrompt)
      .then((response) => {
        // Handle the response as needed
        setGeneratedVacancy(response.generatedVacancy);

        // Set the output after the API call is complete
        setOutput(response.generatedVacancy);
        setOpen(false);
      })
      .catch((error) => {
        // Handle errors if needed
        console.error('Error generating vacancy:', error);
        setOpen(false);
      });
  };

  // Update to use the prop function
  const handleSaveVacancy = () => {
    onSaveVacancy();
  };

  const [adjustPromptPart1, setAdjustPromptPart1] = useState(
    `Basic Information: ${Object.values(basicInformation)
      .filter(Boolean)
      .join(', ')} - Selected Categories: ${selectedCategories
      .map((category) => category.name)
      .join(', ')}`
  );

  return (
    <Box>
      <Typography variant="h6" sx={{ marginBottom: '1vh', color: '#8a8a8a' }}>
        Please review the generated vacancy and make any adjustments as needed.
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ marginRight: '10vw' }}>
          <Typography variant="h6" sx={{ marginTop: '1vh', color: '#4d4d4d' }}>
            Basic Information
          </Typography>
          <Typography
            sx={{
              marginTop: '1vh',
              color: '#4d4d4d',
            }}
          >
            Job Name: {basicInformation.jobName}
          </Typography>
          <Typography sx={{ marginTop: '1vh', color: '#4d4d4d' }}>
            Department: {basicInformation.department}
          </Typography>
          <Typography sx={{ marginTop: '1vh', color: '#4d4d4d' }}>
            Tasks and Responsibilities: {basicInformation.tasksAndResponsibilities}
          </Typography>
          <Typography sx={{ marginTop: '1vh', color: '#4d4d4d' }}>
            Full-Time: {basicInformation.workplaceAndWorkingHours ? 'Yes' : 'No'}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ marginTop: '1vh', color: '#4d4d4d' }}>
            Selected Skills
          </Typography>
          {selectedCategories.map((category) => (
            <Chip
              label={category.name}
              key={category.id}
              sx={{ color: '#4d4d4d', mr: 1, borderRadius: 2 }}
            />
          ))}
        </Box>
      </Box>
      <Typography variant="h6" sx={{ marginTop: '2vh', color: '#4d4d4d' }}>
        Prompt Adjustments
      </Typography>
      <TextField
        label="Make any adjustments to the prompt here. For example, you can shift the focus of the prompt to a specific skill or department."
        variant="outlined"
        fullWidth
        multiline
        rows={2}
        value={adjustPromptPart2}
        onChange={(e) => setAdjustPromptPart2(e.target.value)}
        sx={{ mt: 2 }}
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={() => {
                setAdjustPromptPart2('');
              }}
              color="primary"
              size="small"
              sx={{ position: 'absolute', right: 10, top: 7 }}
            >
              <CloseRoundedIcon />
            </IconButton>
          ),
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleGenerateVacancy}
        sx={{ mt: 2 }}
        disableElevation
        startIcon={<SmartToyRoundedIcon />}
      >
        (Re-)Generate Vacancy
      </Button>
      <Box sx={{ mt: '2vh' }}>
        <Typography variant="h6" sx={{ color: '#4d4d4d' }}>
          Generated Vacancy
        </Typography>
        <TextField
          label="Generated Vacancy will appear here."
          variant="outlined"
          fullWidth
          multiline
          rows={14}
          value={output}
          onChange={(e) => setOutput(e.target.value)}
          sx={{ mt: 2 }}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() => {
                  setGeneratedVacancy('');
                  setOutput('');
                }}
                color="primary"
                size="small"
                sx={{ position: 'absolute', right: 10, top: 7 }}
              >
                <CloseRoundedIcon />
              </IconButton>
            ),
          }}
        />
      </Box>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={open}
      >
        <Paper
          square={false}
          elevation={1}
          sx={{
            width: '60%',
            height: '5%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Typography sx={{ mr: 2, ml: 2 }}>Generating vacancy, please wait...</Typography>
          <LinearProgress
            sx={{
              width: '100%',
              mr: 2,
            }}
            color="secondary"
          />
        </Paper>
      </Backdrop>
    </Box>
  );
};

export default VacancyGeneration;
