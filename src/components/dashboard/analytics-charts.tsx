// ./src/components/dashboard/analytics-charts.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
import { useOwnerId } from '@/hooks/use-user';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
// FIX 1: Import Id type for casting
import type { Id } from '../../../convex/_generated/dataModel'; 

const COLORS = ['#4f46e5', '#60a5fa', '#34d399', '#fbbf24'];

export function AnalyticsCharts() {
  // FIX 2: Rename ownerId to userId
  const userId = useOwnerId();
  
  // FIX 3: Pass userId instead of ownerId, and cast it to Id<'users'>
  const summary = useQuery(
    api.analytics.getOwnerAnalyticsSummary, 
    userId ? { userId: userId as Id<'users'> } : undefined // Pass arguments only if userId exists
  );
  
  const firstTourId = summary?.perTour[0]?.tourId ? String(summary.perTour[0].tourId) : null;
  const firstTourAnalytics = useQuery(
    firstTourId ? api.analytics.getTourAnalytics : null,
    firstTourId ? { tourId: firstTourId } : undefined
  );

  if (summary === undefined) {
    return <div className="p-4 text-center">Loading analytics...</div>;
  }

  const completionData = summary.completionsByDay;
  const tourPerformance = summary.perTour.map((t) => ({ name: t.name, value: Math.round(t.completionRate) }));
  // NOTE: If tourId is an Id<"tours"> in the Convex database, you might need to convert it to string here:
  const stepCompletion = (firstTourAnalytics?.stepCompletionRates || []).map((s) => ({ name: String(s.stepId), completion: Math.round(s.completionRate) }));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Tour Completions</CardTitle>
          <button className="text-gray-500 hover:text-gray-700">
            <ArrowsPointingOutIcon className="h-5 w-5" />
          </button>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={completionData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completions" fill="#4f46e5" name="Completions" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Tour Performance</CardTitle>
          <button className="text-gray-500 hover:text-gray-700">
            <ArrowsPointingOutIcon className="h-5 w-5" />
          </button>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={tourPerformance}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name }) =>
                  name ? `${name}` : ''
                }
              >
                {tourPerformance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value}%`, 'Completion Rate']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Step Completion Rates</CardTitle>
          <button className="text-gray-500 hover:text-gray-700">
            <ArrowsPointingOutIcon className="h-5 w-5" />
          </button>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={stepCompletion}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tickFormatter={(value: number) => `${value}%`} />
              <YAxis dataKey="name" type="category" width={80} />
              <Tooltip formatter={(value: number) => [`${value}%`, 'Completion Rate']} />
              <Legend />
              <Bar dataKey="completion" fill="#4f46e5" name="Completion Rate">
                {stepCompletion.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
