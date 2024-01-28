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
    console.log(basicInformation);
  };

  const aiFunFacts = [
    'Fun fact: Did you know that the first AI was created in 1956?',
    'Fun fact: Did you know that AI has been used to generate amusing pickup lines? Some are hilarious, like "Are you made of copper and tellurium? Because you are Cu-Te!"',
    'Fun fact: Did you know that AI can generate bizarre and unconventional names for things? There was an AI experiment that generated new paint colors with names like "Burble Simp" and "Stanky Bean."',
    'Fun fact: Did you know that sometimes, AI can misinterpret requests in funny ways? For instance, asking an AI to sing a song might result in a hilarious but off-tune rendition.',
    'Fun fact: Did you know that Researchers are teaching AI to understand and generate jokes? Some AI-generated jokes are so bad they are good, like "Why was the math book sad? Because it had too many problems."',
    'Fun fact: Did you know that AI has been used to generate unique and unconventional recipes, sometimes combining unexpected ingredients in strange yet oddly intriguing ways, like "banana peel bacon.".',
  ];

  const getRandomAiFunFact = () => {
    return aiFunFacts[Math.floor(Math.random() * aiFunFacts.length)];
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
            {/** Add fun facts about ai below the loading animation to entertain the user while waiting */}
            {/**<Typography sx={{ marginTop: '1vh', color: '#4d4d4d' }}>
              {getRandomAiFunFact()}
            </Typography>*/}
          </Stack>
        </Paper>
      </Backdrop>
    </Box>
  );
};

export default VacancyGeneration;
