'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  PlayIcon,
  PencilIcon,
  TrashIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export function TourList() {
  // Mock data - replace with actual data from Convex
  const tours = [
    {
      id: 'tour_1',
      name: 'E-commerce Product Walkthrough',
      type: 'ecommerce',
      status: 'active',
      createdAt: '2023-05-15',
      steps: 7,
      completionRate: 82,
    },
    {
      id: 'tour_2',
      name: 'SaaS Onboarding Flow',
      type: 'saas',
      status: 'draft',
      createdAt: '2023-06-20',
      steps: 5,
      completionRate: 0,
    },
    {
      id: 'tour_3',
      name: 'Custom Feature Introduction',
      type: 'custom',
      status: 'active',
      createdAt: '2023-07-10',
      steps: 6,
      completionRate: 65,
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Your Tours</CardTitle>
        <Button>
          <Link href="/dashboard/tours/new">
            Create Tour
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50"
            >
              <div className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                  <PlayIcon className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-medium">{tour.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>{tour.steps} steps</span>
                    <span>•</span>
                    <span>{tour.createdAt}</span>
                    <span>•</span>
                    <Badge
                      variant={tour.status === 'active' ? 'default' : 'secondary'}
                      className="capitalize"
                    >
                      {tour.status}
                    </Badge>
                    <span>•</span>
                    <Badge variant="outline" className="capitalize">
                      {tour.type}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {tour.completionRate > 0 && (
                  <div className="text-sm text-gray-500">
                    {tour.completionRate}% completion
                  </div>
                )}
                <Button variant="ghost" size="icon">
                  <PencilIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <DocumentDuplicateIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}