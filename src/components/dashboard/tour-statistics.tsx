// ./src/components/dashboard/tour-statistics.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  UsersIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  ArrowTrendingUpIcon 
} from '@heroicons/react/24/outline';
import { useOwnerId } from '@/hooks/use-user';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
// FIX 1: Import Id type for casting
import type { Id } from '../../../convex/_generated/dataModel'; 

export function TourStatistics() {
  // FIX 2: Rename variable to match the Convex argument name
  const userId = useOwnerId();
  
  // FIX 3: Use 'userId' for the argument and apply the "skip" pattern
  const stats = useQuery(
    api.users.getUserStats, 
    userId ? { userId: userId as Id<'users'> } : "skip"
  );

  if (stats === undefined) {
    return <div className="p-4 text-center">Loading stats...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Tours</CardTitle>
          <UsersIcon className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalTours}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Tours</CardTitle>
          <CheckCircleIcon className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeTours}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Published Tours</CardTitle>
          <ClockIcon className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.publishedTours}</div>
          <p className="text-xs text-muted-foreground">Completed Sessions: {stats.completedSessions}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Completion</CardTitle>
          <ArrowTrendingUpIcon className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.completionRate}%</div>
        </CardContent>
      </Card>
    </div>
  );
}
