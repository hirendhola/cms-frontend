import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '@/utils/axiosConfig';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [authState, setAuthState] = useState({
    user: null,
    college: null,
    loading: true,
  });
  const navigate = useNavigate();

  const fetchAuthStatus = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/admin/me`);
      setAuthState(prevState => ({
        ...prevState,
        user: response.data.admin,
        college: response.data.college,
        loading: false,
      }));
      return true;
    } catch (error) {
      console.error('Auth check failed:', error);
      setAuthState(prevState => ({ ...prevState, loading: false }));
      return false;
    }
  }, []);

  useEffect(() => {
    fetchAuthStatus();
  }, [fetchAuthStatus]);

  const signIn = async (credentials) => {
    const response = await axiosInstance.post('/auth/admin/signin', credentials);
    localStorage.setItem('adminAccessToken', response.data.accessToken);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
    await fetchAuthStatus();
    return response.data;
  };

  const signOut = async () => {
    await axiosInstance.post('/auth/admin/signout');
    setAuthState({ user: null, college: null, loading: false });
    localStorage.removeItem('AdminaccessToken');
    delete axiosInstance.defaults.headers.common['Authorization'];
    navigate('/auth/admin/signin');
  };

  const refreshData = useCallback(async () => {
    await fetchAuthStatus();
  }, [fetchAuthStatus]);

  const checkAuthStatus = useCallback(async () => {
    return await fetchAuthStatus();
  }, [fetchAuthStatus]);

  return {
    ...authState,
    signIn,
    signOut,
    refreshData,
    checkAuthStatus,
  };
};

