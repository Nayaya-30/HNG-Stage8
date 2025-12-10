'use client';

import { useEffect, useState } from 'react';

export type DashboardUser = {
  id: string;
  email: string;
  name: string;
} | null;

export const useCurrentUser = () => {
  const [user, setUser] = useState<DashboardUser>(null);

  useEffect(() => {
    const id = setTimeout(() => {
      const raw = localStorage.getItem('user');
      setUser(raw ? JSON.parse(raw) : null);
    }, 0);
    return () => clearTimeout(id);
  }, []);

  return user;
};

export const useOwnerId = () => {
  const user = useCurrentUser();
  return user?.id || 'anonymous';
};

