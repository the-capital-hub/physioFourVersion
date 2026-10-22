
import { Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import HomePage from "./pages/Home/Home";
import About from "./pages/About/About";
import Services from "./pages/Services/Services";
import Patients from "./pages/Patients/Patients";
import Contact from "./pages/Contact/Contact";
import Appointment from "./pages/Appointment/Appointment";
import AuthPage from "./pages/Auth/Auth";
import ServiceDetail from "./pages/Services/ServiceDetail";

import AIFloatingAssistant from "./components/AIFloatingButton/AIFloatingButton";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

import ProtectedRoute from "./components/Auth/ProtectedRoute";

import PatientDashboard from "./pages/Dashboard/PatientDashboard";
import PhysiotherapistDashboard from "./pages/Dashboard/PhysiotherapistDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";


function AppContent() {
  const location = useLocation();

  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <>
      <ScrollToTop />

      {!isDashboard && <Navbar />}

      <main>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/appointment" element={<Appointment />} />

          {/* Authentication */}
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />

          {/* Patient Dashboard */}
          <Route
            element={<ProtectedRoute allowedRole="patient" />}
          >
            <Route
              path="/dashboard/patient"
              element={<PatientDashboard />}
            />
          </Route>

          {/* Physiotherapist Dashboard */}
          <Route
            element={
              <ProtectedRoute allowedRole="physiotherapist" />
            }
          >
            <Route
              path="/dashboard/physiotherapist"
              element={<PhysiotherapistDashboard />}
            />
          </Route>

          {/* Admin Dashboard */}
          <Route
            element={<ProtectedRoute allowedRole="admin" />}
          >
            <Route
              path="/dashboard/admin"
              element={<AdminDashboard />}
            />
          </Route>
        </Routes>
      </main>

      {!isDashboard && <Footer />}
      {!isDashboard && <AIFloatingAssistant />}
    </>
  );
}

export default function App() {
  return <AppContent />;
}
