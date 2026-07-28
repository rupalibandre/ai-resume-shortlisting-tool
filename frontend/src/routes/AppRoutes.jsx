import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Jobs from "../pages/Jobs";
import Candidates from "../pages/Candidates";
import UploadResume from "../pages/UploadResume";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";

import MainLayout from "../layouts/MainLayout";

function ProtectedRoute({ children }) {

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/jobs"
            element={<Jobs />}
          />

          <Route
            path="/candidates"
            element={<Candidates />}
          />

          <Route
            path="/upload-resume"
            element={<UploadResume />}
          />

          <Route
            path="/reports"
            element={<Reports />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;