import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { Category } from '../types/category';
import { VacancyJobInformationProps } from './VacancyJobInformation';
import API from '../api/api';

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
  const handleGenerateVacancy = () => {
    const adjustedPrompt = `${adjustPromptPart2}`;

    API.getAPI()
      .generateVacancy(basicInformation, selectedCategories, adjustedPrompt)
      .then((response) => {
        // Handle the response as needed
        setGeneratedVacancy(response.generatedVacancy);

        // Set the output after the API call is complete
        setOutput(response.generatedVacancy);
      })
      .catch((error) => {
        // Handle errors if needed
        console.error('Error generating vacancy:', error);
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
        rows={2} // Adjust the number of rows as needed
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
        rows={2} // Adjust the number of rows as needed
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
        {/* Remove this Typography block */}
        {/* <Typography variant="h4">Generated Vacancy</Typography> */}
        {/* <Typography>{generatedVacancy}</Typography> */}

        <TextField
          label="Output"
          variant="outlined"
          fullWidth
          multiline
          rows={14} // Adjust the number of rows as needed
          value={output}
          onChange={(e) => setOutput(e.target.value)}
          sx={{ mt: 2 }}
        />
      </Box>
    </Box>
  );
};

export default VacancyGeneration;
