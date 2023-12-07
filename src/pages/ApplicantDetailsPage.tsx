import React from 'react';
import { Avatar, Box, Button, Grid, LinearProgress, Stack, Table, Typography } from '@mui/material';
import { APP_BAR_HEIGHT } from '../constants';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CollapsibleTable from '../components/CollapsibleTable';

export interface ApplicantDetailsPageProps {
  ratingOverall: number;
  receivingDate: string; // #TODO: Switch later to Date type when backend and db are 'connected'
}

export default function ApplicantDetailsPage(props: ApplicantDetailsPageProps) {
  const { ratingOverall } = props;

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
          Peter Müller
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
              value={ratingOverall}
              defaultValue={20}
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
            >{`${Math.round(props.ratingOverall)}%`}</Typography>
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

ApplicantDetailsPage.defaultProps = {
  ratingOverall: 50,
  receivingDate: '05.08.2023',
};
