import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Typography, Button, Stack } from '@mui/material';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import VacancyJobInformations, {
  VacancyJobInformationsProps,
} from '../components/VacancyJobInformation';
import VacancyCategorySelectionPage from '../components/VacancyCategorys';
import { Category } from '../types/category';
import VacancyGeneration from '../components/VacancyGeneration';
import API from '../api/api';

export default function VacancyCreationPage() {
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<VacancyJobInformationsProps['formData']>({
    jobName: '',
    department: '',
    tasksAndResponsibilities: '',
    requiredSkills: '',
    workplaceAndWorkingHours: '',
    languageRequirements: '',
    additionalInformation: '',
  });

  const [generatedVacancy, setGeneratedVacancy] = useState('');
  const [adjustPromptPart2, setAdjustPromptPart2] = useState('');
  const [output, setOutput] = useState('');

  const handleCategorySelectionChange = (selectedCategories: Category[]) => {
    setCategories(selectedCategories);
  };

  const handleSaveVacancy = () => {
    // Check if there is any content in the output (either generated or custom)
    if (output.trim()) {
      API.getAPI()
        .addVacancy({
          basicInformation: formData,
          selectedCategories: categories,
          generatedVacancy: output, // Use the output directly, whether it's generated or custom
        })
        .then((response) => {
          // Handle the response as needed
          console.log('Vacancy saved successfully:', response);

          // You can clear the generatedVacancy and adjustPromptPart2 if needed
          setGeneratedVacancy('');
          setAdjustPromptPart2('');

          // Set the output after saving if needed
          setOutput('Vacancy saved successfully');
        })
        .catch((error) => {
          // Handle errors if needed
          console.error('Error saving vacancy:', error);
          setOutput('Error saving vacancy');
        });
    } else {
      // Handle the case where there is no content to save
      setOutput('No content to save. Enter some text first.');
    }
  };

  const [basicInfoCompleted, setBasicInfoCompleted] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setAlertMessage(null);
  }, [page, formData]);

  const handleNext = () => {
    if (page === 1) {
      const basicInfoFields = [
        'jobName',
        'department',
        'tasksAndResponsibilities',
        'requiredSkills',
        'workplaceAndWorkingHours',
      ];
      const isBasicInfoComplete = basicInfoFields.every((field) => Boolean(formData[field]));

      if (!isBasicInfoComplete) {
        console.log('Please fill out all required fields in Basic Information.');
        setAlertMessage('Please fill out all required fields in Basic Information');
        return;
      }

      setBasicInfoCompleted(true);
    }
    if (page === 3) {
      // Handle the case when the user is on the last page
      // You can put the logic for saving the vacancy here
      handleSaveVacancy();
      return;
    }

    setPage(page + 1);
  };

  const handleBack = () => {
    if (page === 1) {
      navigate('/inquiries');
    } else {
      setPage(Math.max(1, page - 1));
      setBasicInfoCompleted(false);
    }
  };

  return (
    <Box sx={{}}>
      <Box sx={{ marginLeft: 3, marginTop: 10, pb: 2 }}>
        <Typography variant="h4" fontWeight={'bold'} sx={{ color: '#4d4d4d' }}>
          Vacancy creation
        </Typography>
      </Box>

      <Container maxWidth="xl" sx={{ mt: 1 }}>
        {page === 1 && (
          <VacancyJobInformations
            onNext={handleNext}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {page === 2 && (
          <VacancyCategorySelectionPage
            onNext={handleNext}
            onSelectedCategoriesChange={(categories) => handleCategorySelectionChange(categories)}
            categories={categories}
          />
        )}
        {page === 3 && (
          <VacancyGeneration
            selectedCategories={categories}
            basicInformation={formData}
            generatedVacancy={generatedVacancy}
            adjustPromptPart2={adjustPromptPart2}
            output={output}
            setGeneratedVacancy={setGeneratedVacancy}
            setAdjustPromptPart2={setAdjustPromptPart2}
            setOutput={setOutput}
            onSaveVacancy={handleSaveVacancy} // Pass the function as a prop
          />
        )}

        {alertMessage && <Alert severity="error">{alertMessage}</Alert>}

        <Stack direction="row" justifyContent="space-between" mt={4}>
          <Button variant="contained" onClick={handleBack}>
            {page > 1 ? 'Back' : 'Cancel'}
          </Button>
          <Button variant="contained" color="secondary" onClick={handleNext}>
            {page < 3 ? 'Next' : 'Save new vacancy'}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
