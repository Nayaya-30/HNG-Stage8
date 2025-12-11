'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnalyticsCharts } from '@/components/dashboard/analytics-charts';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import type { Id, Doc } from '../../../../convex/_generated/dataModel';
import { useOwnerId } from '@/hooks/use-user';

export default function AnalyticsPage() {
  const ownerId = useOwnerId();

  type TourDoc = Doc<"tours">;

  const tours = useQuery(
    api.tours.listTours,
    ownerId ? { userId: ownerId as Id<"users"> } : "skip"
  );

  const totalTours = tours?.length || 0;
  const activeTours = tours?.filter((t: TourDoc) => t.isActive).length || 0;
  const draftTours = tours?.filter((t: TourDoc) => !t.isPublished).length || 0;

  const tourStats = useMemo(() => {
    if (!tours) return [];
    const hashString = (str: string): number => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return Math.abs(hash);
    };

    return tours.map((tour: TourDoc) => {
      const seed = hashString(tour._id);
      return {
        ...tour,
        stepsCount: tour.totalSteps,
        views: (seed % 500) + 100,
        completion: (seed % 30) + 60,
      };
    });
  }, [tours]);

  type TourStats = typeof tourStats[number];

  return (
    <div className="space-y-6 text-white">

      {/* PAGE HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-brand-gold drop-shadow">
          Analytics
        </h1>
        <p className="mt-1 text-white/60">
          Track performance and user engagement across all tours
        </p>
      </div>

      {/* TOP GRID STATS */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* CARD TEMPLATE */}
        <Card className="bg-brand-royal/30 border border-brand-royal/20 backdrop-blur-lg shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-brand-gold">
              Total Tours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalTours}</div>
            <p className="text-xs text-white/50">
              {activeTours} active • {draftTours} draft
            </p>
          </CardContent>
        </Card>

        <Card className="bg-brand-royal/30 border border-brand-royal/20 backdrop-blur-lg shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-brand-gold">
              Total Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">2,543</div>
            <p className="text-xs text-white/50">+12.5% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-brand-royal/30 border border-brand-royal/20 backdrop-blur-lg shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-brand-gold">
              Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">73.2%</div>
            <p className="text-xs text-white/50">+4.1% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-brand-royal/30 border border-brand-royal/20 backdrop-blur-lg shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-brand-gold">
              Avg. Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">3m 24s</div>
            <p className="text-xs text-white/50">-8s from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* CHARTS */}
      <div className="bg-brand-royal/20 rounded-lg p-4 border border-brand-royal/10">
        <AnalyticsCharts />
      </div>

      {/* TABLE SECTION */}
      <Card className="bg-brand-royal/30 border border-brand-royal/20 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-brand-gold">Tour Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">

            {tours === undefined ? (
              <p className="text-sm text-white/60">Loading tours...</p>
            ) : tours.length === 0 ? (
              <p className="text-sm text-white/60">No tours available</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-white">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-3 px-4 text-left font-medium text-sm">Tour Name</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                      <th className="text-right py-3 px-4 font-medium text-sm">Steps</th>
                      <th className="text-right py-3 px-4 font-medium text-sm">Views</th>
                      <th className="text-right py-3 px-4 font-medium text-sm">Completion</th>
                    </tr>
                  </thead>

                  <tbody>
                    {tourStats.map((tour: TourStats) => (
                      <tr
                        key={tour._id}
                        className="border-b border-white/10 hover:bg-brand-royal/20 transition"
                      >
                        <td className="py-3 px-4 text-sm">{tour.name}</td>

                        <td className="py-3 px-4 text-sm capitalize text-white/70">
                          {tour.tourType}
                        </td>

                        <td className="py-3 px-4 text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium 
                              ${tour.isActive
                                ? 'bg-brand-gold text-black'
                                : 'bg-brand-blue/20 text-brand-blue'
                              }`}
                          >
                            {tour.isActive ? 'active' : 'draft'}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-sm text-right">{tour.stepsCount}</td>
                        <td className="py-3 px-4 text-sm text-right">{tour.views}</td>
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
