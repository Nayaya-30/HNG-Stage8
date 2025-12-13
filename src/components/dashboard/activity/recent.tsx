'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';

interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: number;
}

export function RecentActivity() {
  const activities = useQuery(api.analytics.getRecentActivity);

  if (activities === undefined) {
    return <div className="p-4 text-center text-sm text-gray-500">Loading activity...</div>;
  }

  return (
    <Card className="bg-brand-royal/30 border border-brand-royal/20 backdrop-blur-lg shadow-lg">
      <CardHeader>
        <CardTitle className="text-brand-gold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-sm text-white/60">No recent activity.</p>
          ) : (
            activities.map((activity: Activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="uppercase">
                    {activity.user.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-white">
                    <span className="font-medium">{activity.user}</span>{' '}
                    <span className="text-white/70">{activity.action}</span>{' '}
                    <span className="font-medium">{activity.target}</span>
                  </p>
                  <p className="text-xs text-white/60">
                    {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
