'use client';

import { TourList } from '@/components/dashboard/tours/list';
import { StatsCards } from '@/components/dashboard/stats/cards';
import { RecentActivity } from '@/components/dashboard/activity/recent';
import { CreateTourButton } from '@/components/dashboard/tours/create-button';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-brand-gold drop-shadow">Dashboard</h1>
        <CreateTourButton />
      </div>
      
      <StatsCards />
      
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