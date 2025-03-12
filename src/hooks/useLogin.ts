import { useRouter } from 'next/navigation';
import { useAppDispatch } from './redux.hooks';
import axios from 'axios';
import { verifyAuth } from '@/redux/auth/thunk';

interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

export const useLogin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const login = async (formData: { email: string; password: string }, redirectPath: string) => {
    try {
      const res = await axios.post<LoginResponse>('/api/auth/login', formData);

      if (res.status === 200) {
        dispatch(verifyAuth());

        router.push(redirectPath);
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  return { login };
};