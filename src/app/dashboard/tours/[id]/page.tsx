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

  // Fetch the specific tour
  const tour = useQuery(api.tours.getTour, { id: tourId as Id<'tours'> });

  const updateTour = useMutation(api.tours.updateTour);

  const handleSave = async (data: TourFormData) => {
    try {
      await updateTour({
        id: tourId as Id<'tours'>,
        name: data.name,
        tourType: data.type,
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

  /* -------------------------------
       LOADING & ERROR STATES
  -------------------------------- */

  if (tour === undefined) {
    return (
      <div className="p-8 text-center text-white">
        Loading tour...
      </div>
    );
  }

  const tourDoc = tour as Doc<'tours'> | null;

  if (tourDoc === null) {
    return (
      <div className="p-8 text-center text-red-400 font-semibold">
        Tour not found
      </div>
    );
  }

  /* -------------------------------
         INITIAL FORM DATA
  -------------------------------- */

  const initialData: TourFormData = {
    name: tourDoc.name,
    type: tourDoc.tourType,
    status: tourDoc.isActive ? 'active' : 'draft',
    steps: [], // Steps should be loaded later when your schema supports it
  };

  /* -------------------------------
                UI
  -------------------------------- */

  return (
    <div className="space-y-6 text-white">
      <div>
        <h1 className="text-3xl font-bold text-brand-gold drop-shadow">
          Edit Tour
        </h1>
        <p className="mt-1 text-white/60">
          Update your tour configuration and steps
        </p>
      </div>

      <div className="bg-brand-royal/20 p-6 rounded-xl border border-brand-royal/30 backdrop-blur-md">
        <TourEditor
          initialData={initialData}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}
