'use client';

import { TourStatistics } from '@/components/dashboard/tour-statistics';
import { RecentActivity } from '@/components/dashboard/activity/recent';
import { TourList } from '@/components/dashboard/tours/list';

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">
          Welcome to your TourMaster dashboard. Here you can manage your tours and view analytics.
        </p>
      </div>
      
      <TourStatistics />
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TourList />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
