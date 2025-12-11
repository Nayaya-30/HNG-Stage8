'use client';

import { useRouter } from 'next/navigation';
import { TourEditor, type TourFormData } from '@/components/dashboard/tour-editor';
import { useMutation } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { toast } from 'sonner';

export default function NewTourPage() {
  const router = useRouter();
  const createTour = useMutation(api.tours.createTour);

  const handleSave = async (data: TourFormData) => {
    try {
      await createTour({
        name: data.name,
        type: data.type,
        status: data.status,
        steps: data.steps,
        ownerId: 'user_123', // TODO: Replace with actual user ID from auth
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