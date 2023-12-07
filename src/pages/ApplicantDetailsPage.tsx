import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, LinearProgress, Stack, Typography } from '@mui/material';
import { APP_BAR_HEIGHT } from '../constants';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Applicant } from '../types/applicant';
import CustomizedTables from '../components/CustomizedTable';
import { BACKEND_URL } from '../constants';

export interface ApplicantDetailsPageProps {
  receivingDate: string; // TODO: Change this later to Date once the backend and database are connected
  applicant: Applicant;
}

export default function ApplicantDetailsPage(props: ApplicantDetailsPageProps) {
  const [applicantRating, setApplicantRating] = useState(2);

  const maxProgressBarValue = 10;

  const linearProgressValue = (props.applicant.rating / maxProgressBarValue) * 100;

  useEffect(() => {
    setApplicantRating(props.applicant.rating);
  }, [props.applicant.rating]);

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
        {/** TODO: Replace with backend url that serves the profile picture */}
        <Avatar
          src={'https://thispersondoesnotexist.com/'}
          sx={{ width: 100, height: 100, border: 5, borderColor: '#B4CD93' }}
        ></Avatar>
        <Typography
          variant="h5"
          sx={{
            color: '#4d4d4d',
            marginLeft: '1vw',
            fontWeight: 'bold',
            minWidth: '8vw',
          }}
        >
          {props.applicant.firstName + ' ' + props.applicant.lastName}
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
                minWidth: '80%',
                alignSelf: 'center',
              }}
            />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ paddingLeft: '1vw', fontSize: 30 }}
            >
              {applicantRating + '/10'}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ marginRight: '4vw' }}>
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
          <Button
            variant="contained"
            startIcon={<AttachFileIcon />}
            color="secondary"
            disableElevation
            disabled
            sx={{ margin: 1 }}
          >
            Cover Letter
          </Button>
        </Box>
      </Box>
      <Typography sx={{ color: 'grey', marginLeft: 3, marginBottom: '3vh' }}>
        Application received: {props.receivingDate}
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
          <CustomizedTables />
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
  rating: 5.5,
};

ApplicantDetailsPage.defaultProps = {
  receivingDate: '05.08.2023',
  applicant: defaultApplicant,
};
