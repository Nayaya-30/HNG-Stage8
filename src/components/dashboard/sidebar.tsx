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
        "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 lg:static lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* GLASS SIDEBAR */}
      <div className="flex h-full flex-col backdrop-blur-xl bg-brand-royal/30 border-r border-brand-royal/40 text-white">

        {/* LOGO AREA */}
        <div className="flex h-16 items-center border-b border-brand-royal/40 px-4">
          <h1 className="text-xl font-semibold text-brand-gold tracking-wide">
            OnboardX
          </h1>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all",
                  active
                    ? "bg-brand-blue/20 text-brand-gold border border-brand-blue/40 shadow-md"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 transition-colors",
                    active ? "text-brand-gold" : "text-white/50 group-hover:text-white"
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* LOGOUT */}
        <div className="border-t border-brand-royal/40 p-4">
          <button
            onClick={logout}
            className="group flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-red-500/20 transition-all"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5 text-red-400 group-hover:text-red-300" />
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}
