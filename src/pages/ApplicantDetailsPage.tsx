import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, LinearProgress, Stack, Typography } from '@mui/material';
import { APP_BAR_HEIGHT } from '../constants';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Applicant } from '../types/applicant';
import ApplicantDetailsTable from '../components/ApplicantDetailsTable';
import API from '../api/api';
import { useParams } from 'react-router-dom';
import { Rating } from '../types/rating';

export default function ApplicantDetailsPage() {
  const [applicantRatings, setApplicantRatings] = useState<Rating[]>([]);
  const [applicant, setApplicant] = useState<Applicant | null>(null);
  const [meanApplicantRating, setMeanApplicantRating] = useState<number>(0);
  const maxProgressBarValue = 10;
  const { vacancy_id, applicant_id } = useParams();

  useEffect(() => {
    const fetchApplicant = async () => {
      try {
        const api = API.getAPI();
        // if ID is provided, fetch applicant by ID
        if (applicant_id) {
          const applicantObject = await api.fetchApplicant(applicant_id);
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
  }, [applicant_id]);

  useEffect(() => {
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
    const meanRating = applicantRatings.reduce((a, b) => a + b.score, 0) / applicantRatings.length;
    setMeanApplicantRating(meanRating);
  }, [applicantRatings]);

  const linearProgressValue = (meanApplicantRating / maxProgressBarValue) * 100;

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
          Java Developer Backend
        </Typography>
        <Typography variant="h6" sx={{ color: '#4d4d4d' }}>
          IT Department
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
            minWidth: '5vw',
            paddingRight: '1vw',
          }}
        >
          {applicant && applicant.firstName + ' ' + applicant.lastName}
        </Typography>
        <Box
          sx={{
            width: '100%',
            flexDirection: 'row',
          }}
        >
          <Box
            sx={{
              flexDirection: 'row',
              display: 'flex',
            }}
          >
            <LinearProgress
              variant="determinate"
              value={linearProgressValue}
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
              {meanApplicantRating + '/10'}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ marginRight: '2vw', paddingLeft: 5 }}>
          <Typography variant="h6" sx={{ marginLeft: 1 }}>
            Attached Documents
          </Typography>
          {/** TODO: Add functionality to view pdf in browser */}
          <Button
            variant="contained"
            startIcon={<AttachFileIcon />}
            color="secondary"
            disableElevation
            sx={{ margin: 1 }}
          >
            CV
          </Button>
        </Box>
      </Box>
      {/** TODO: add receiving date */}
      <Typography variant="h6" sx={{ marginBottom: '3vh', color: '#4d4d4d', marginLeft: 3 }}>
        Application received: TODO
      </Typography>
      <Box
        sx={{
          marginLeft: 3,
          marginRight: 3,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box>
          <ApplicantDetailsTable applicantRatings={applicantRatings} />
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
};

ApplicantDetailsPage.defaultProps = {
  receivingDate: '05.08.2023',
  applicant: defaultApplicant,
};
