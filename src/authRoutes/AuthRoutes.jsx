import { Route } from "react-router-dom";
import AdminSignUpForm from '@/pages/Admin/SignUpForm';
import AdminSignInForm from '@/pages/Admin/SignInForm';
import HodSignUpForm from '@/pages/Hod/SignUpForm';
import HodSignInForm from '@/pages/Hod/SignInForm';

const AuthRoutes = [
  <Route key="admin-signup" path='/auth/admin/signup' element={<AdminSignUpForm />} />,
  <Route key="admin-signin" path='/auth/admin/signin' element={<AdminSignInForm />} />,
  <Route key="hod-signup" path='/auth/hod/signup' element={<HodSignUpForm />} />,
  <Route key="hod-signin" path='/auth/hod/signin' element={<HodSignInForm />} />,
  // Add other routes here
];

export default AuthRoutes;