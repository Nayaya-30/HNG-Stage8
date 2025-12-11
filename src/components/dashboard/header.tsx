'use client';

import { Bars3Icon, BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Badge } from '@/components/ui/badge';

interface DashboardHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function DashboardHeader({ setSidebarOpen }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur-lg bg-brand-navy/40 border-b border-brand-royal/40 shadow-lg">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 text-white">
        
        {/* LEFT SIDE */}
        <div className="flex items-center gap-4">
          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-md p-2 text-white/70 hover:text-white lg:hidden"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          {/* BETA BADGE */}
          <Badge className="bg-brand-blue/20 border border-brand-blue/50 text-brand-blue">
            Beta
          </Badge>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* NOTIFICATIONS */}
          <button className="relative rounded-full p-2 text-white/70 hover:text-white hover:bg-white/10 transition-all">
            <BellIcon className="h-6 w-6" />
          </button>

          {/* USER AVATAR */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-brand-blue/20 border border-brand-blue/40">
              <UserCircleIcon className="h-6 w-6 text-brand-blue" />
            </div>
            <span className="hidden md:block text-sm font-medium text-white/80">
              Admin User
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
