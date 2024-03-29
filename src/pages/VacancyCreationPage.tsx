import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Stack,
  Box,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
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

/**
 * This page allows the user to create a new vacancy using a multi-step form.
 * @returns A page for creating a new vacancy.
 */
export default function VacancyCreationPage() {
  const [page, setPage] = useState<number>(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<VacancyJobInformationProps['formData']>({
    title: '',
    department: '',
    tasksAndResponsibilities: '',
    workingHours: '',
    description: '',
  });

  const [generatedVacancy, setGeneratedVacancy] = useState('');
  const [adjustPromptPart2, setAdjustPromptPart2] = useState('');
  const [output, setOutput] = useState('');
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [openFailedDialog, setOpenFailedDialog] = useState(false);
  const [basicInfoCompleted, setBasicInfoCompleted] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  /**
   * Handles the change of selected categories.
   * @param selectedCategories The selected categories.
   */
  const handleCategorySelectionChange = (selectedCategories: Category[]) => {
    setCategories(selectedCategories);
  };

  // New state variable for disabling the "Next" button on page 2
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);

  /**
   * Handles the change of the total weight of the selected categories.
   * @param totalWeight The total weight of the selected categories.
   */
  const handleTotalWeightChange = (totalWeight: number) => {
    setNextButtonDisabled(totalWeight !== 100);
  };

  /**
   * Handles the saving of the vacancy. Shows a dialog on success or failure.
   */
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
          // Clear the generatedVacancy and adjustPromptPart2
          setGeneratedVacancy('');
          setAdjustPromptPart2('');

          // Show a success message with a dialog
          setOpenSuccessDialog(true);
        })
        .catch((error) => {
          // Handle errors if needed
          console.error('Error saving vacancy:', error);
          // Show a failure message with a dialog
          setOpenFailedDialog(true);
        });
    } else {
      // Handle the case where there is no content to save
      setOutput('No content to save. Enter some text first.');
    }
  };

  /**
   * Handles the click on the "New Vacancy" button in the success dialog.
   */
  const handleInquiriesClick = () => {
    setOpenSuccessDialog(false);
    navigate('/inquiries');
  };

  /**
   * Handles the click on the "All Vacancies" button in the success dialog.
   */
  const handleVacanciesClick = () => {
    setOpenSuccessDialog(false);
    navigate('/vacancies');
  };

  useEffect(() => {
    setAlertMessage(null);
  }, [page, formData]);

  /**
   * Handles the click on the "Next" button and validates the form data.
   * @returns {JSX.Element}
   */
  const handleNext = () => {
    if (page === 1) {
      const basicInfoFields = [
        'title',
        'department',
        'tasksAndResponsibilities',
        'workingHours',
        'description',
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

  /**
   * Handles the click on the "Back" button and navigates to the previous page.
   */
  const handleBack = () => {
    if (page === 1) {
      navigate('/inquiries');
    } else {
      setPage(Math.max(1, page - 1));
      setBasicInfoCompleted(false);
    }
  };

  return (
    <Box sx={{ marginLeft: 3, marginTop: 10, pb: 2, marginRight: 3 }}>
      <Box>
        <Typography variant="h4" fontWeight={'bold'} sx={{ color: '#4d4d4d' }}>
          Generating a new vacancy
        </Typography>
        <Typography variant="h5" sx={{ color: '#4d4d4d', marginTop: '1vh' }}>
          Step {page}/3:{' '}
          {page === 1
            ? 'Basic job information'
            : page === 2
            ? 'Skill Selection'
            : 'Vacancy Generation'}
        </Typography>
      </Box>

      <Box maxWidth="xl" sx={{ marginTop: '1vh' }}>
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
            onSelectedCategoriesChange={(categories) => {
              handleCategorySelectionChange(categories);
              handleTotalWeightChange(
                categories.reduce((total, category) => total + (category.weight || 0), 0)
              );
            }}
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
          {page === 1 && (
            <Button
              variant="contained"
              disableElevation
              onClick={handleBack}
              startIcon={<ClearRoundedIcon />}
              sx={{
                textTransform: 'none',
                backgroundColor: '#cc7a7a',
                '&:hover': {
                  backgroundColor: '#966b6b',
                },
              }}
            >
              Cancel
            </Button>
          )}
          {page > 1 && (
            <Button
              variant="contained"
              color="secondary"
              disableElevation
              onClick={handleBack}
              startIcon={<NavigateBeforeRoundedIcon />}
              sx={{ textTransform: 'none' }}
            >
              Back
            </Button>
          )}
          {page === 1 && (
            <Button
              variant="contained"
              color="secondary"
              disableElevation
              onClick={handleNext}
              endIcon={<NavigateNextRoundedIcon />}
              sx={{ textTransform: 'none' }}
            >
              Next
            </Button>
          )}
          {page === 2 && (
            <Button
              variant="contained"
              color="secondary"
              disableElevation
              onClick={handleNext}
              endIcon={<NavigateNextRoundedIcon />}
              sx={{ textTransform: 'none' }}
              disabled={nextButtonDisabled}
            >
              Next
            </Button>
          )}
          {page === 3 && (
            <>
              <Button
                variant="contained"
                color="secondary"
                disableElevation
                onClick={handleSaveVacancy}
                endIcon={<SaveRoundedIcon />}
                sx={{ textTransform: 'none' }}
              >
                Save
              </Button>
              <Dialog open={openSuccessDialog}>
                <DialogTitle>Vacancy saved successfully!</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Do you want to create another vacancy or go to the vacancies page?
                  </DialogContentText>
                  <DialogActions>
                    <Button onClick={handleInquiriesClick}>New Vacancy</Button>
                    <Button onClick={handleVacanciesClick}>All Vacancies</Button>
                  </DialogActions>
                </DialogContent>
              </Dialog>
              <Dialog open={openFailedDialog}>
                <DialogTitle>Error while saving!</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    An error occurred while saving your vacancy. Please contact the system admin.
                  </DialogContentText>
                  <DialogActions>
                    <Button onClick={() => setOpenFailedDialog(false)}>Close</Button>
                  </DialogActions>
                </DialogContent>
              </Dialog>
            </>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
