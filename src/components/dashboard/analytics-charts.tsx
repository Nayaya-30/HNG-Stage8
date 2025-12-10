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
import {
  ArrowsPointingOutIcon
} from '@heroicons/react/24/outline';

const completionData = [
  { date: 'Dec 1', completions: 45 },
  { date: 'Dec 2', completions: 52 },
  { date: 'Dec 3', completions: 48 },
  { date: 'Dec 4', completions: 60 },
  { date: 'Dec 5', completions: 55 },
  { date: 'Dec 6', completions: 65 },
  { date: 'Dec 7', completions: 70 },
];

const tourPerformance = [
  { name: 'E-commerce Walkthrough', value: 85 },
  { name: 'SaaS Onboarding', value: 72 },
  { name: 'Feature Intro', value: 68 },
  { name: 'Checkout Guide', value: 90 },
];

const stepCompletion = [
  { name: 'Step 1', completion: 95 },
  { name: 'Step 2', completion: 88 },
  { name: 'Step 3', completion: 75 },
  { name: 'Step 4', completion: 65 },
  { name: 'Step 5', completion: 55 },
];

const COLORS = ['#4f46e5', '#60a5fa', '#34d399', '#fbbf24'];

export function AnalyticsCharts() {
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