'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnalyticsCharts } from '@/components/dashboard/analytics-charts';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useOwnerId } from '@/hooks/use-user';

interface Tour {
  _id: string;
  name: string;
  type: 'ecommerce' | 'saas' | 'custom';
  status: 'draft' | 'active';
  steps: Array<{
    id: string;
    title: string;
    content: string;
    position: 'top' | 'bottom' | 'left' | 'right';
    targetElement?: string;
  }>;
  ownerId: string;
  createdAt: number;
  updatedAt: number;
}

export default function AnalyticsPage() {
  const ownerId = useOwnerId();
  const tours = useQuery(api.tours.listTours, { ownerId });

  // Calculate overall stats
  const totalTours = tours?.length || 0;
  const activeTours = tours?.filter((t: Tour) => t.status === 'active').length || 0;
  const draftTours = tours?.filter((t: Tour) => t.status === 'draft').length || 0;

  // Generate stable mock data using tour ID as seed for deterministic values
  const tourStats = useMemo(() => {
    if (!tours) return [];

    // Simple hash function to convert tour ID to a number
    const hashString = (str: string): number => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
      }
      return Math.abs(hash);
    };

    return tours.map((tour: Tour) => {
      const seed = hashString(tour._id);
      return {
        ...tour,
        views: (seed % 500) + 100,
        completion: (seed % 30) + 60,
      };
    });
  }, [tours]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="mt-1 text-gray-500">
          Track performance and user engagement across all tours
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tours</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTours}</div>
            <p className="text-xs text-muted-foreground">
              {activeTours} active, {draftTours} draft
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,543</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73.2%</div>
            <p className="text-xs text-muted-foreground">
              +4.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Time</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3m 24s</div>
            <p className="text-xs text-muted-foreground">
              -8s from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <AnalyticsCharts />

      {/* Tour-specific Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Tour Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tours === undefined ? (
              <p className="text-sm text-gray-500">Loading tours...</p>
            ) : tours.length === 0 ? (
              <p className="text-sm text-gray-500">No tours available</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-sm">Tour Name</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                      <th className="text-right py-3 px-4 font-medium text-sm">Steps</th>
                      <th className="text-right py-3 px-4 font-medium text-sm">Views</th>
                      <th className="text-right py-3 px-4 font-medium text-sm">Completion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tourStats.map((tour) => (
                      <tr key={tour._id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-medium">{tour.name}</td>
                        <td className="py-3 px-4 text-sm capitalize">{tour.type}</td>
                        <td className="py-3 px-4 text-sm">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${tour.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                            }`}>
                            {tour.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-right">{tour.steps.length}</td>
                        <td className="py-3 px-4 text-sm text-right">
                          {tour.views}
                        </td>
                        <td className="py-3 px-4 text-sm text-right">
                          {tour.completion}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
