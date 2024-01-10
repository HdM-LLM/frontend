import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { Box, TextField, Button, Backdrop, Typography } from '@mui/material';
import { Category } from '../types/category';
import { VacancyJobInformationProps } from './VacancyJobInformation';
import API from '../api/api';
import LinearProgress from '@mui/material/LinearProgress';

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
      <TextField
        label="Basic Prompt Information (Locked)"
        variant="outlined"
        fullWidth
        multiline
        disabled
        rows={2}
        value={adjustPromptPart1}
        sx={{ mt: 2 }}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        label="Adjust Prompt (Editable)"
        variant="outlined"
        fullWidth
        multiline
        rows={2}
        value={adjustPromptPart2}
        onChange={(e) => setAdjustPromptPart2(e.target.value)}
        sx={{ mt: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleGenerateVacancy}
        sx={{ mt: 2 }}
        disableElevation
      >
        Generate Vacancy
      </Button>
      <Box sx={{ mt: 2 }}>
        <TextField
          label="Output"
          variant="outlined"
          fullWidth
          multiline
          rows={14}
          value={output}
          onChange={(e) => setOutput(e.target.value)}
          sx={{ mt: 2 }}
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
          <Typography sx={{ mr: 2, ml: 2 }}>Loading...</Typography>
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
