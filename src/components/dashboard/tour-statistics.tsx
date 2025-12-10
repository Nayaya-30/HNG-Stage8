'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  UsersIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  ArrowTrendingUpIcon 
} from '@heroicons/react/24/outline';

export function TourStatistics() {
  // Mock data - replace with actual data from Convex
  const stats = [
    {
      title: 'Total Tours',
      value: '24',
      change: '+2 from last month',
      icon: UsersIcon,
      iconColor: 'text-blue-500',
    },
    {
      title: 'Active Tours',
      value: '18',
      change: '85% conversion rate',
      icon: CheckCircleIcon,
      iconColor: 'text-green-500',
    },
    {
      title: 'Steps Completed',
      value: '1,240',
      change: '+12% from last week',
      icon: ClockIcon,
      iconColor: 'text-yellow-500',
    },
    {
      title: 'Avg. Completion',
      value: '78.5%',
      change: '+5% from last month',
      icon: ArrowTrendingUpIcon,
      iconColor: 'text-purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.iconColor}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}