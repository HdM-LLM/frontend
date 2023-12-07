import React from 'react';
import { Avatar, Box, Button, LinearProgress, Stack, Typography } from '@mui/material';
import { APP_BAR_HEIGHT } from '../constants';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CollapsibleTable from '../components/CollapsibleTable';
import { Applicant } from '../types/applicant';

export interface ApplicantDetailsPageProps {
  receivingDate: string; // TODO: Change this later to Date once the backend and database are connected
  applicant: Applicant;
}

export default function ApplicantDetailsPage(props: ApplicantDetailsPageProps) {
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
        <Avatar src="src/assets/images/java_dev.png" sx={{ width: 70, height: 70 }}></Avatar>
        <Typography
          variant="h5"
          sx={{
            color: '#4d4d4d',
            marginLeft: '1vw',
            fontWeight: 'bold',
            minWidth: '10vw',
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
              value={props.applicant.rating}
              defaultValue={0}
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
            >{`${Math.round(props.applicant.rating)}%`}</Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="h6">Attached Documents</Typography>
          <Button
            variant="contained"
            startIcon={<AttachFileIcon />}
            color="secondary"
            sx={{ margin: 1 }}
          >
            Cover Letter
          </Button>
          <Button
            variant="contained"
            startIcon={<AttachFileIcon />}
            color="secondary"
            sx={{ margin: 1 }}
          >
            Curriculum Vitae
          </Button>
        </Box>
      </Box>
      <Typography variant="h6" sx={{ color: 'grey', marginLeft: 3, marginBottom: '3vh' }}>
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
          <CollapsibleTable />
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
  rating: 30,
};

ApplicantDetailsPage.defaultProps = {
  receivingDate: '05.08.2023',
  applicant: defaultApplicant,
};
