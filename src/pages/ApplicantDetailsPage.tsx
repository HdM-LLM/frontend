import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, LinearProgress, Stack, Typography } from '@mui/material';
import { APP_BAR_HEIGHT } from '../constants';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Applicant } from '../types/applicant';
import ApplicantDetailsTable from '../components/ApplicantDetailsTable';
import API from '../api/api';
import { useParams } from 'react-router-dom';
import { Rating } from '../types/rating';
import { Vacancy } from '../types/vacancy';

/**
 * This page displays the details of an applicant for a specific vacancy.
 * @returns A page displaying the details of an applicant.
 */
export default function ApplicantDetailsPage() {
  const [applicantRatings, setApplicantRatings] = useState<Rating[]>([]);
  const [applicant, setApplicant] = useState<Applicant | null>(null);
  const [meanApplicantRating, setMeanApplicantRating] = useState<number>(0);
  const [vacancyData, setVacancyData] = useState<Vacancy | null>(null);
  const maxProgressBarValue = 10;
  const { vacancy_id, applicant_id } = useParams();

  useEffect(() => {
    /**
     * Fetches applicant by ID of the previously selected vacancy.
     * @returns {Promise<void>}
     */
    const fetchApplicant = async () => {
      try {
        const api = API.getAPI();
        // if ID is provided, fetch applicant by ID
        if (applicant_id && vacancy_id) {
          const applicantObject = await api.fetchApplicant(applicant_id, vacancy_id);
          // null check to prevent errors during rendering
          if (!applicantObject) {
            console.error('Error fetching applicant: No applicant found');
            setApplicant(null);
          }
          setApplicant(applicantObject);
          return;
        }
        // else show error
        // TODO: Show error message in UI; create error message component
        console.error('Error fetching applicant: No ID provided');
      } catch (error) {
        console.error('Error fetching applicant:', error);
      }
    };

    fetchApplicant();
  }, [applicant_id, vacancy_id]);

  useEffect(() => {
    /**
     * Fetches ratings of the applicant by ID.
     * @returns {Promise<void>}
     */
    const fetchRating = async () => {
      try {
        if (!applicant_id) {
          console.error('Error fetching rating: No Applicant ID provided');
          return;
        }
        if (!vacancy_id) {
          console.error('Error fetching rating: No Vacancy ID provided');
          return;
        }

        const api = API.getAPI();
        const rating = await api.fetchApplicantRatings(vacancy_id, applicant_id);
        setApplicantRatings(rating);
      } catch (error) {
        console.error('Error fetching rating:', error);
      }
    };

    fetchRating();
  }, [applicant_id, vacancy_id]);

  useEffect(() => {
    // Set mean rating
    if (applicant) {
      const totalScoreNumber = parseFloat(applicant.totalScore);
      setMeanApplicantRating(totalScoreNumber);
    } else {
      setMeanApplicantRating(0);
    }
  }, [applicant]);

  // fetch vacancy by ID
  useEffect(() => {
    /**
     * Fetches all vacancy data with the vacancy ID provided by URL params.
     * @returns {Promise<void>}
     */
    const fetchVacancy = async () => {
      try {
        if (!vacancy_id) {
          console.error('Error fetching vacancy: No ID provided');
          return;
        }

        const api = API.getAPI();
        const vacancyData = await api.fetchVacancy(vacancy_id);
        // null check to prevent errors during rendering
        if (!vacancyData) {
          console.error('Error fetching vacancy: No vacancy found');
          return;
        }
        // set vacancy
        setVacancyData(vacancyData);
      } catch (error) {
        console.error('Error fetching vacancy:', error);
      }
    };

    fetchVacancy();
  }, [vacancy_id]);

  /**
   * Fetches the URL to the CV of the applicant as PDF.
   * @returns {string} URL to the CV of the applicant as PDF
   */
  const getCvAsPdf = () => {
    const api = API.getAPI();
    if (!applicant_id) {
      console.error('Error fetching CV: No applicant ID provided');
      return '';
    }
    if (!vacancy_id) {
      console.error('Error fetching CV: No vacancy ID provided');
      return '';
    }

    return api.fetchCvURL(applicant_id, vacancy_id);
  };

  return (
    <Box
      sx={{
        flex: 1,
        height: 'calc(100vh - APP_BAR_HEIGHT)',
        marginTop: APP_BAR_HEIGHT,
      }}
    >
      <Stack sx={{ marginLeft: 3, marginTop: 10, pb: 2 }} direction="column">
        <Typography variant="h4" fontWeight={'bold'} sx={{ color: '#4d4d4d' }}>
          {vacancyData && vacancyData.title}
        </Typography>
        <Typography variant="h6" sx={{ color: '#4d4d4d' }}>
          {vacancyData && vacancyData.department}
        </Typography>
      </Stack>
      <Box
        sx={{
          marginLeft: 3,
          marginRight: 3,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '100%',
        }}
      >
        <Avatar
          src={`data:image/png;base64,${applicant && applicant.img}`}
          sx={{ width: 100, height: 100, border: 5, borderColor: '#B4CD93' }}
        ></Avatar>
        <Typography
          variant="h5"
          sx={{
            color: '#4d4d4d',
            marginLeft: '1vw',
            fontWeight: 'bold',
            width: '12vw',
            paddingRight: '1vw',
          }}
        >
          {applicant && applicant.firstName + ' ' + applicant.lastName}
        </Typography>
        <Box
          sx={{
            width: '83%',
            flexDirection: 'row',
          }}
        >
          <Box
            sx={{
              flexDirection: 'row',
              display: 'flex',
            }}
          >
            {applicant && (
              <>
                <LinearProgress
                  variant="determinate"
                  value={(meanApplicantRating / maxProgressBarValue) * 100}
                  color="secondary"
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    minWidth: '85%',
                    alignSelf: 'center',
                  }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ paddingLeft: '1vw', fontSize: 30 }}
                >
                  {meanApplicantRating.toFixed(1) + '/10'}
                </Typography>
              </>
            )}
          </Box>
        </Box>
        <Box sx={{ maxWidth: '25%', width: '17%', marginRight: 3 }}>
          <Stack direction="column" spacing={2}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#cc7a7a',
                '&:hover': {
                  backgroundColor: '#966b6b',
                },
              }}
              disableElevation
            >
              Reject
            </Button>
            <Button variant="contained" color="secondary" disableElevation>
              Accept & Invite
            </Button>
          </Stack>
        </Box>
      </Box>
      {/** #TODO: add receiving date */}
      <Typography
        variant="h6"
        sx={{ marginBottom: '2vh', color: '#4d4d4d', marginLeft: 3, marginTop: '2vh' }}
      >
        Application received: TODO
      </Typography>
      <Box
        sx={{
          marginLeft: 3,
          marginRight: 3,
          flexDirection: 'row',
          width: '80%',
        }}
      >
        <Box
          sx={{
            flexDirection: 'row',
            width: '100%',
          }}
        >
          <ApplicantDetailsTable applicantRatings={applicantRatings} />
        </Box>
        <Box>
          <Typography variant="h6">Attached Documents</Typography>
          <Button
            variant="contained"
            startIcon={<AttachFileIcon />}
            color="secondary"
            disableElevation
            href={getCvAsPdf()}
            target="_blank"
          >
            CV
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

const defaultApplicant: Applicant = {
  id: '71ea697b-ef4a-4601-8fde-58ab45226fe0',
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: '20.08.2023',
  street: 'Main Street 5',
  postalCode: 12345,
  city: 'Example City',
  email: 'john.doe@example.com',
  phoneNumber: '1234 567890',
  skills: [],
  img: '',
  dateCreated: '20.08.2023',
  totalScore: '7',
};

ApplicantDetailsPage.defaultProps = {
  receivingDate: '05.08.2023',
  applicant: defaultApplicant,
};
