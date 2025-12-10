'use client';

import { Bars3Icon, BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Badge } from '@/components/ui/badge';

interface DashboardHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function DashboardHeader({ setSidebarOpen }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-white shadow">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <button
            type="button"
            className="rounded-md p-2 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="ml-4 lg:ml-0">
            <Badge variant="secondary" className="font-medium">
              Beta
            </Badge>
          </div>
        </div>

        <div className="flex items-center">
          <button
            type="button"
            className="relative rounded-full bg-white p-1 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="ml-3 relative">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <UserCircleIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">Admin User</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}