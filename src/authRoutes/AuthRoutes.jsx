// import { Route } from "react-router-dom";
// import AdminSignUpForm from '@/pages/Admin/SignUpForm';
// import AdminSignInForm from '@/pages/Admin/SignInForm';

// const AuthRoutes = () => {

//   <Route key="admin-signup" path='/auth/admin/signup' element={<AdminSignUpForm />} />,
//     <Route key="admin-signin" path='/auth/admin/signin' element={<AdminSignInForm />} />,
//   {/* <Route path='/hod/signup' element={<SignUpForm />} />
//     <Route path='/hod/signin' element={<SignUpForm />} />
//     <Route path='/teacher/signup' element={<SignUpForm />} />
//     <Route path='/teacher/signin' element={<SignUpForm />} />
//     <Route path='/student/signin' element={<SignUpForm />} />
//     <Route path='/student/signin' element={<SignUpForm />} /> */}

// }

// export default AuthRoutes


import { Route } from "react-router-dom";
import AdminSignUpForm from '@/pages/Admin/SignUpForm';
import AdminSignInForm from '@/pages/Admin/SignInForm';

const AuthRoutes = [
  <Route key="admin-signup" path='/auth/admin/signup' element={<AdminSignUpForm />} />,
  <Route key="admin-signin" path='/auth/admin/signin' element={<AdminSignInForm />} />
  // Add other routes here
];

export default AuthRoutes;