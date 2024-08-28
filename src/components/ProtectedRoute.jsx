import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/Admin/useAuth';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>
  }

  return user ? <Outlet /> : <Navigate to="/auth/admin/signin" />
};

export default ProtectedRoute;