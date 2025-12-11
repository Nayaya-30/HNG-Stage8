// ./src/app/dashboard/tours/new/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { TourEditor, type TourFormData } from '@/components/dashboard/tour-editor';
import { useMutation } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { toast } from 'sonner';
import { useOwnerId } from '@/hooks/use-user';
// REQUIRED IMPORT: Id type for casting
import type { Id } from '../../../../../convex/_generated/dataModel'; 

export default function NewTourPage() {
  const router = useRouter();
  const createTour = useMutation(api.tours.createTour);
  
  // userId holds the string ID
  const userId = useOwnerId(); 

  const handleSave = async (data: TourFormData) => {
    // Check if userId is available before proceeding
    if (!userId) {
      toast.error('User ID not available. Cannot create tour.');
      return;
    }
    
    try {
      await createTour({
        name: data.name,
        tourType: data.type, 
        status: data.status,
        steps: data.steps,
        // FIX: Cast the string ID to the required Id<'users'> type
        userId: userId as Id<'users'>, 
      });

      toast.success('Tour created successfully!');
      router.push('/dashboard/tours');
    } catch (error) {
      console.error('Failed to create tour:', error);
      toast.error('Failed to create tour. Please try again.');
    }
  };

  const handleCancel = () => {
    router.push('/dashboard/tours');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Create New Tour</h1>
        <p className="mt-1 text-gray-500">
          Design an engaging onboarding experience for your users
        </p>
      </div>

      <TourEditor onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
}
