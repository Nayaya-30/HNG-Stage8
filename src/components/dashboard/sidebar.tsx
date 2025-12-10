'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  ClipboardDocumentListIcon, 
  Cog6ToothIcon,
  ChartBarIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Tours', href: '/dashboard/tours', icon: ClipboardDocumentListIcon },
  { name: 'Analytics', href: '/dashboard/analytics', icon: ChartBarIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
];

interface DashboardSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function DashboardSidebar({ sidebarOpen, setSidebarOpen }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <div 
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center border-b px-4">
          <h1 className="text-xl font-bold text-indigo-600">TourMaster</h1>
        </div>
        
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center rounded-md px-2 py-2 text-sm font-medium",
                pathname === item.href
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              )}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon
                className={cn(
                  "mr-3 h-6 w-6 flex-shrink-0",
                  pathname === item.href
                    ? "text-indigo-700"
                    : "text-gray-500 group-hover:text-gray-700"
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="border-t p-4">
          <button
            onClick={logout}
            className="group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            <ArrowLeftOnRectangleIcon
              className="mr-3 h-6 w-6 flex-shrink-0 text-gray-500 group-hover:text-gray-700"
              aria-hidden="true"
            />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
