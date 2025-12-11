
'use client';

import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { ConvexClientProvider } from '@/lib/convex/client';
import { cn } from '@/lib/utils';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login - in a real app this would be handled by middleware
    return <div className="flex h-screen items-center justify-center">Redirecting to login...</div>;
  }

  return (
    <ConvexClientProvider>
      <div className={cn('flex min-h-screen', sidebarOpen ? 'overflow-hidden' : '')}>
        <DashboardSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <div className="flex flex-1 flex-col">
          <DashboardHeader
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </ConvexClientProvider>
  );
}
