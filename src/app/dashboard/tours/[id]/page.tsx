// ./src/app/dashboard/tours/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { TourEditor, type TourFormData } from '@/components/dashboard/tour-editor';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import type { Id, Doc } from '../../../../../convex/_generated/dataModel'; 
import { toast } from 'sonner';

export default function EditTourPage() {
  const params = useParams();
  const router = useRouter();
  const tourId = params.id as string;

  const tour = useQuery(api.tours.getTour, { id: tourId as Id<'tours'> });
  const updateTour = useMutation(api.tours.updateTour);

  const handleSave = async (data: TourFormData) => {
    try {
      // The types here are now consistent with the updated convex/tours.ts file.
      await updateTour({
        id: tourId as Id<'tours'>,
        name: data.name,
        tourType: data.type, // tourType property is correctly updated and now matches the mutation's expected type
        status: data.status,
        steps: data.steps,
      });

      toast.success('Tour updated successfully!');
      router.push('/dashboard/tours');
    } catch (error) {
      console.error('Failed to update tour:', error);
      toast.error('Failed to update tour. Please try again.');
    }
  };

  const handleCancel = () => {
    router.push('/dashboard/tours');
  };

  if (tour === undefined) {
    return <div className="p-8 text-center">Loading tour...</div>;
  }

  const tourDoc = tour as Doc<"tours"> | null;

  if (tourDoc === null) {
    return <div className="p-8 text-center text-red-600">Tour not found</div>;
  }

  const initialData: TourFormData = {
    name: tourDoc.name,
    type: tourDoc.tourType, 
    status: tourDoc.isActive ? 'active' : 'draft', 
    steps: [], 
  };


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Edit Tour</h1>
        <p className="mt-1 text-gray-500">
          Update your tour configuration and steps
        </p>
      </div>

      <TourEditor
        initialData={initialData}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}
