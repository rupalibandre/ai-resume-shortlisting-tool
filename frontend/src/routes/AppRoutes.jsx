import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Jobs from "../pages/Jobs";
import Candidates from "../pages/Candidates";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import UploadResume from "../pages/UploadResume";

import MainLayout from "../layouts/MainLayout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/upload-resume" element={<UploadResume />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;