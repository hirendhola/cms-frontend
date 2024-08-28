import { Route, Routes } from "react-router-dom";
import AuthRoutes from './authRoutes/AuthRoutes';
import NotFound from './pages/NotFound';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Admin/Dashboard';
import ProtectedRoute from '@/components/ProtectedRoute.jsx';

function App() {


  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path='/admin/dashboard' element={<Dashboard />} />
        {/* Add other protected routes here */}
      </Route>
      {AuthRoutes}
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;