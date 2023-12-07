import * as React from 'react';
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

export default function App() {
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
            {/* #TODO: Change element back to VacancyPage when ApplicantDetailsPage is done */}
            <Route path="/positions" element={<ApplicantDetailsPage />} />
            <Route path="/inquiries" element={<InquiriesPage />} />
            <Route path="/applicants" element={<ApplicantsPage />} />
            <Route path="/applicants/overview" element={<OverviewPage />} />
            <Route path="/applicants/upload" element={<UploadPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </MainBox>
      </Box>
    </BrowserRouter>
  );
}
