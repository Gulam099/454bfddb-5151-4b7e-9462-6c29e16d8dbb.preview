'use client';

import { useAuth } from '@/lib/admin-auth';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

export function AdminProtected({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
