'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function RecentActivity() {
  // Mock data - replace with actual data from Convex
  const activities = [
    {
      id: 1,
      user: 'Alex Johnson',
      action: 'created a new tour',
      target: 'E-commerce Product Walkthrough',
      time: '5 minutes ago',
    },
    {
      id: 2,
      user: 'Sam Wilson',
      action: 'completed',
      target: 'SaaS Onboarding Flow',
      time: '2 hours ago',
    },
    {
      id: 3,
      user: 'Taylor Reed',
      action: 'updated steps in',
      target: 'Custom Feature Introduction',
      time: '1 day ago',
    },
    {
      id: 4,
      user: 'Jordan Smith',
      action: 'deleted',
      target: 'Old Welcome Tour',
      time: '3 days ago',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {activity.user
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.user}</span>{' '}
                  <span className="text-gray-600">{activity.action}</span>{' '}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}