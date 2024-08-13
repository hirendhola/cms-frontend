import AuthRoutes from './authRoutes/AuthRoutes';
import { Route, Routes } from "react-router-dom";
import NotFound from './pages/NotFound';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      {AuthRoutes}
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;