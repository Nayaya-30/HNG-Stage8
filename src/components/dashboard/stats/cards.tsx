// ./src/components/dashboard/stats/cards.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useOwnerId } from '@/hooks/use-user';
import type { Doc, Id } from '../../../../convex/_generated/dataModel';

// Corrected UITour definition (no need to redefine fields that aren't present)
type UITour = Doc<'tours'> & {
  // Assuming listTours includes totalSteps and isActive
  totalSteps: number;
  isActive: boolean;
};

export function StatsCards() {
  const userId = useOwnerId();

  const tours = useQuery(
    api.tours.listTours, 
    userId ? { userId: userId as Id<'users'> } : "skip"
  );

  // Map the raw Doc<'tours'> to the expected structure for stats calculation
  const tourList = tours?.map(tour => ({
      ...tour,
      status: tour.isActive ? 'active' : 'draft', 
      // FIX: Rely ONLY on totalSteps, which is assumed to be present (or 0)
      stepsCount: tour.totalSteps || 0,
      type: tour.tourType, // Map Convex field 'tourType' to local field 'type'
  })) || [];

  const totalTours = tourList.length;
  const activeTours = tourList.filter(t => t.status === 'active').length;
  const draftTours = tourList.filter(t => t.status === 'draft').length;
  
  // Use the stepsCount property derived above for reduction
  const totalSteps = tourList.reduce((acc, tour) => acc + tour.stepsCount, 0);

  const stats = [
    {
      title: 'Total Tours',
      value: totalTours,
      description: `${activeTours} active, ${draftTours} draft`,
      icon: (
        <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      title: 'Active Tours',
      value: activeTours,
      description: 'Currently published',
      icon: (
        <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: 'Total Steps',
      value: totalSteps,
      description: 'Across all tours',
      icon: (
        <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      title: 'Avg. Completion',
      value: '68%',
      description: '+5.2% from last week',
      icon: (
        <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
