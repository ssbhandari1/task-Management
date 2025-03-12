'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Loading from '../common/loading';
import { useAuth } from '@/hooks/useAuth';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathName = usePathname();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated && pathName !== '/auth/login' && pathName !== '/auth/signup') {
        router.push('/auth/login');
      } else if (isAuthenticated && (pathName === '/auth/login' || pathName === '/auth/signup')) {
        router.push('/backlog');
      }
    }
  }, [ isAuthenticated, pathName]);

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
}
