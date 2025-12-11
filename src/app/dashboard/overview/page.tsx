'use client';

import { TourStatistics } from '@/components/dashboard/tour-statistics';
import { RecentActivity } from '@/components/dashboard/activity/recent';
import { TourList } from '@/components/dashboard/tours/list';

export default function OverviewPage() {
  return (
    <div className="space-y-6 text-white">
      
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-brand-gold drop-shadow">
          Dashboard
        </h1>
        <p className="text-white/60">
          Welcome to your OnboardX dashboard. Manage your tours and track progress.
        </p>
      </div>

      {/* TOP STAT CARDS */}
      <div className="bg-brand-royal/20 p-4 rounded-xl border border-brand-royal/10 backdrop-blur-sm">
        <TourStatistics />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* LEFT SECTION: TOUR LIST */}
        <div className="lg:col-span-2">
          <div className="bg-brand-royal/20 rounded-xl border border-brand-royal/10 p-4 backdrop-blur-sm">
            <TourList />
          </div>
        </div>

        {/* RIGHT SECTION: RECENT ACTIVITY */}
        <div className="bg-brand-royal/20 rounded-xl border border-brand-royal/10 p-4 backdrop-blur-sm">
          <RecentActivity />
        </div>

      </div>
    </div>
  );
}
