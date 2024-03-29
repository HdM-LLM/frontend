import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import {
  Box,
  TextField,
  Button,
  Backdrop,
  Typography,
  Chip,
  IconButton,
  Stack,
} from '@mui/material';
import { Category } from '../types/category';
import { VacancyJobInformationProps } from './VacancyJobInformation';
import API from '../api/api';
import LinearProgress from '@mui/material/LinearProgress';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

/**
 * Interface for props required by the VacancyGeneration component.
 * @interface VacancyGenerationProps
 * @property {Category[]} selectedCategories - The categories selected for the vacancy.
 * @property {VacancyJobInformationProps['formData']} basicInformation - The basic information about the vacancy, such as job title and description.
 * @property {string} generatedVacancy - The generated vacancy text.
 * @property {string} adjustPromptPart2 - Additional text to adjust or refine the vacancy generation prompt.
 * @property {string} output - The final output text for the generated vacancy.
 * @property {React.Dispatch<React.SetStateAction<string>>} setGeneratedVacancy - State setter function for updating the generated vacancy text.
 * @property {React.Dispatch<React.SetStateAction<string>>} setAdjustPromptPart2 - State setter function for updating the adjustment text.
 * @property {React.Dispatch<React.SetStateAction<string>>} setOutput - State setter function for the final output text.
 * @property {() => void} onSaveVacancy - Callback function to trigger when the vacancy is to be saved.
 */
interface VacancyGenerationProps {
  selectedCategories: Category[];
  basicInformation: VacancyJobInformationProps['formData'];
  generatedVacancy: string;
  adjustPromptPart2: string;
  output: string;
  setGeneratedVacancy: React.Dispatch<React.SetStateAction<string>>;
  setAdjustPromptPart2: React.Dispatch<React.SetStateAction<string>>;
  setOutput: React.Dispatch<React.SetStateAction<string>>;
  onSaveVacancy: () => void;
}

/**
 * Component for generating vacancy descriptions based on selected categories and basic information.
 *
 * @param {VacancyGenerationProps} props - The props for the VacancyGeneration component.
 * @returns {JSX.Element} - Renders the vacancy generation interface with options to adjust prompt and save the generated vacancy.
 */
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
  const [open, setOpen] = useState(false);

  /**
   * Handles the generation of a vacancy description by calling an API with the provided information and selected categories.
   * Adjusts the prompt as needed, sets the generated vacancy and output state, and handles any errors that may occur.
   */
  const handleGenerateVacancy = () => {
    const adjustedPrompt = `${adjustPromptPart2}`;
    setOpen(true);

    // Call API to generate the vacancy description
    API.getAPI()
      .generateVacancy(basicInformation, selectedCategories, adjustedPrompt)
      .then((response) => {
        // Update state with the response from the API
        setGeneratedVacancy(response.generatedVacancy);
        setOutput(response.generatedVacancy);
        setOpen(false);
      })
      .catch((error) => {
        // Handle errors if needed
        console.error('Error generating vacancy:', error);
        setOpen(false);
      });
    console.log(basicInformation);
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ marginBottom: '1vh', color: '#8a8a8a' }}>
        Let the AI generate a vacancy for you. You can adjust the prompt to fit your needs.
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ marginRight: '15vw' }}>
          <Typography variant="h6" sx={{ marginTop: '1vh', color: '#4d4d4d' }}>
            Basic Information
          </Typography>
          <Typography
            sx={{
              marginTop: '1vh',
              color: '#4d4d4d',
            }}
          >
            Job Name: {basicInformation.title}
          </Typography>
          <Typography sx={{ marginTop: '1vh', color: '#4d4d4d' }}>
            Department: {basicInformation.department}
          </Typography>
          <Typography sx={{ marginTop: '1vh', color: '#4d4d4d' }}>
            Tasks and Responsibilities: {basicInformation.tasksAndResponsibilities}
          </Typography>
          <Typography sx={{ marginTop: '1vh', color: '#4d4d4d' }}>
            Full-Time position:{' '}
            {basicInformation.workplaceAndWorkingHours === 'Full Time' ? 'Yes' : 'No'}
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
              sx={{ color: '#4d4d4d', mr: 1, mb: 1, borderRadius: 2 }}
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
        Generate Vacancy
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
                sx={{
                  position: 'absolute',
                  right: 35,
                  top: 7,
                  visibility: output ? 'visible' : 'hidden',
                }}
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
            width: '50%',
            height: '10%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Stack
            direction="column"
            spacing={2}
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: 'auto',
            }}
          >
            <Typography variant="h6" sx={{ marginTop: '1vh', color: '#4d4d4d' }}>
              Generating vacancy, please wait...
            </Typography>
            <LinearProgress
              sx={{
                width: '90%',
              }}
              color="secondary"
            />
          </Stack>
        </Paper>
      </Backdrop>
    </Box>
  );
};

export default VacancyGeneration;
