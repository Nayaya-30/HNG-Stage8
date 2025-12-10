import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const id = setTimeout(() => {
      const userRaw = localStorage.getItem('user');
      setIsAuthenticated(!!userRaw);
      setIsLoading(false);
    }, 0);
    return () => clearTimeout(id);
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    router.push('/auth/signin');
  };

  return {
    isAuthenticated,
    isLoading,
    logout,
  };
};
