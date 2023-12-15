
import Container from "@mui/material/Container";
import { Box, Typography, Stack } from "@mui/material";
import CustomizedVacancyTables from "../components/CustomizedVacancyTable";
import { APP_BAR_HEIGHT } from "../constants";
import API from "../api/api";
import React, { useEffect, useState } from 'react';


export default function OverviewPage() {
  const [applicants, setApplicants] = useState<any[]>([]); 
  const receivingDate = '1st December 2023'; // Define receivingDate

  React.useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const api = API.getAPI();
        const allApplicantsData = await api.fetchApplicants();
        setApplicants(allApplicantsData);
      } catch (error) {
        console.error("Error fetching all applicants:", error);
      }
    };

    fetchAllApplicants();
  }, []);

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
          OverviewPage
        </Typography>
      </Stack>
      <Box
        sx={{
          marginLeft: 3,
          marginRight: 3,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box>
          <CustomizedVacancyTables
            applicants={applicants}
            receivingDate={receivingDate}
          />
        </Box>
      </Box>
    </Box>
  );
}