import * as React from "react";
import Dashboard from "./pages/Dashboard";
import ApplicantsPage from "./pages/ApplicantsPage";
import InquiriesPage from "./pages/InquiriesPage";
import PositionPage from "./pages/PositionPage";
import SettingsPage from "./pages/SettingsPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Box from "@mui/material/Box";
import AppBar from "./components/AppBar";
import Drawer from "./components/Drawer";

export default function App() {
  return (
    <BrowserRouter>
      <Box sx={{ display: "flex" }}>
        <AppBar />
        <Drawer />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/positions" element={<PositionPage />} />
          <Route path="/inquiries" element={<InquiriesPage />} />
          <Route path="/applicants" element={<ApplicantsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}
