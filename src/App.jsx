import { Route, Routes } from "react-router-dom";
import AuthRoutes from './authRoutes/AuthRoutes';
import NotFound from './pages/NotFound';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './pages/Admin/Dashboard';
import HodDashboard from './pages/Hod/Dashboard';
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import AboutUs from "./pages/AboutUs";
// import ProtectedRoute from '@/components/ProtectedRoute.jsx';
function App() {


  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      {/* <Route element={<ProtectedRoute />}> */}
      <Route path='/admin/dashboard' element={<AdminDashboard />} />
      <Route path='/hod/dashboard' element={<HodDashboard />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/about-us" element={<AboutUs />} />

      {/* </Route> */}
      {AuthRoutes}
      <Route path='*' element={<NotFound />} />

    </Routes>
  );
}

export default App;