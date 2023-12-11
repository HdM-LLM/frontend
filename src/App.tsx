import * as React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import Dashboard from './pages/Dashboard';
import ApplicantsPage from './pages/ApplicantsPage';
import OverviewPage from './pages/OverviewPage';
import UploadPage from './pages/UploadPage';
import InquiriesPage from './pages/InquiriesPage';
import VacancyPage from './pages/VacancyPage';
import SettingsPage from './pages/SettingsPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Box from '@mui/material/Box';
import AppBar from './components/AppBar';
import Drawer from './components/Drawer';
import { styled } from '@mui/material';
import { DRAWER_WIDTH } from './constants';
import ApplicantDetailsPage from './pages/ApplicantDetailsPage';
import { mockApplicants } from './mock-data/applicants';
import VacancyDetailsPage from './pages/VacancyDetailsPage';
import { mockVacancies } from './mock-data/vacancies';

export default function App() {
  const [selectedVacancy, setSelectedVacancy] = useState(mockVacancies[0]);
  const vacancy_id = useParams();
  const applicant_id = useParams();

  const MainBox = styled(Box)(({ theme }) => ({
    flex: 1,
    overflow: 'auto',
    background: theme.palette.background.default,
    boxShadow: 'none',
    marginLeft: theme.spacing(DRAWER_WIDTH),
  }));
  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex' }}>
        <AppBar />
        <Drawer />
        <MainBox component="main">
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/vacancies" element={<VacancyPage />} />
            <Route path="/inquiries" element={<InquiriesPage />} />
            <Route path="/applicants" element={<ApplicantsPage />} />
            <Route path="/applicants/overview" element={<OverviewPage />} />
            <Route path="/applicants/upload" element={<UploadPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            {/** TODO: Path needs to be adjusted, when the page that shows all applicants for one vacancy is done */}
            <Route path="/applicantDetails/:applicant_id" element={<ApplicantDetailsPage />} />
            <Route
              path="/vacancy/:vacancy_id"
              element={<VacancyDetailsPage vacancy={selectedVacancy} />}
            />
          </Routes>
        </MainBox>
      </Box>
    </BrowserRouter>
  );
}
