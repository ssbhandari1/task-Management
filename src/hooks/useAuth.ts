import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux.hooks';
import { verifyAuth } from '@/redux/auth/thunk';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(verifyAuth());
  }, [dispatch]);

  return { isAuthenticated, loading };
};
