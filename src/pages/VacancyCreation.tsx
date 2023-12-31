import React, { useState, useEffect } from 'react';
import { Typography, Button, Stack, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VacancyJobInformation, {
  VacancyJobInformationProps,
} from '../components/VacancyJobInformation';
import VacancyCategorySelectionPage from '../components/VacancyCategories';
import { Category } from '../types/category';
import VacancyGeneration from '../components/VacancyGeneration';
import API from '../api/api';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';

export default function VacancyCreationPage() {
  const [page, setPage] = useState<number>(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<VacancyJobInformationProps['formData']>({
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
        setAlertMessage('Please fill out all required fields to continue');
        return;
      }

      setBasicInfoCompleted(true);
    }
    // User is on last page and clicks next
    if (page === 3) {
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
          New Vacancy
        </Typography>
        <Typography variant="h6" sx={{ color: '#4d4d4d' }}>
          Step {page}/3:{' '}
          {page === 1
            ? 'Basic Information'
            : page === 2
            ? 'Category Selection'
            : 'Vacancy Generation'}
        </Typography>
      </Box>

      <Box maxWidth="xl" sx={{ marginTop: '1vh', marginLeft: 3 }}>
        {page === 1 && (
          <VacancyJobInformation
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
            onSaveVacancy={handleSaveVacancy}
          />
        )}

        {alertMessage && <Alert severity="error">{alertMessage}</Alert>}

        <Stack direction="row" justifyContent="space-between" mt={4}>
          <Button
            variant="contained"
            onClick={handleBack}
            sx={{ backgroundColor: '#cc7a7a' }}
            disableElevation
          >
            {page === 1 ? <ClearRoundedIcon /> : <NavigateBeforeRoundedIcon />}
            {page > 1 ? 'Back' : 'Cancel'}
          </Button>
          {/* TODO: Next button should be disabled when no category is selected in step 2 */}
          <Button variant="contained" color="secondary" onClick={handleNext} disableElevation>
            {page < 3 ? <NavigateNextRoundedIcon /> : <SaveRoundedIcon />}
            {page < 3 ? 'Next' : 'Save new vacancy'}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
