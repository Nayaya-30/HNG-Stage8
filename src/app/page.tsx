'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Redirecting to dashboard...</h1>
        <p className="mt-2 text-gray-600">If you are not redirected automatically, <a href="/dashboard" className="text-indigo-600 hover:underline">click here</a>.</p>
      </div>
    </div>
  );
}
