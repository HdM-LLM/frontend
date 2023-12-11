import * as React from 'react';
import { useState } from 'react';
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
import VacancyDetailsPage from './pages/VacancyDetailsPage';
import { mockVacancies } from './mock-data/vacancies';
import { Vacancy } from './types/vacancy';

export default function App() {
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy>(mockVacancies[0]);

  //const handleVacancySelection = (vacancy: Vacancy) => {
  //  setSelectedVacancy(vacancy);
  //};

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

            <Route path="/vacancies" element={<VacancyPage vacancies={mockVacancies} />} />
            <Route path="/inquiries" element={<InquiriesPage />} />
            <Route path="/applicants" element={<ApplicantsPage />} />
            <Route path="/applicants/overview" element={<OverviewPage />} />
            <Route path="/applicants/upload" element={<UploadPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route
              path="/vacancies/:vacancy_id/applicant/:applicant_id"
              element={<ApplicantDetailsPage />}
            />
            {/** TODO: selectedVacancy is always the same since setSelectedVacancy is never used -> must be fixed */}
            <Route
              path="/vacancies/:vacancy_id"
              element={<VacancyDetailsPage vacancy={selectedVacancy} />}
            />
          </Routes>
        </MainBox>
      </Box>
    </BrowserRouter>
  );
}
