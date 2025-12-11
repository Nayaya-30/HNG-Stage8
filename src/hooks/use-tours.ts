import { useMutation, useQuery } from 'convex/react';
import { api } from '@/lib/convex/_generated/api';
import { Id } from '@/lib/convex/_generated/dataModel';

export const useTours = (ownerId: string) => {
  const tours = useQuery(api.functions.tours.listTours, { ownerId });
  
  const createTour = useMutation(api.functions.tours.createTour);
  const updateTour = useMutation(api.functions.tours.updateTour);
  const deleteTour = useMutation(api.functions.tours.deleteTour);
  
  return {
    tours,
    createTour,
    updateTour,
    deleteTour,
  };
};

export const useTour = (tourId: Id<'tours'> | null) => {
  const tour = useQuery(
    tourId ? api.functions.tours.getTour : null,
    tourId ? { id: tourId } : undefined
  );
  
  return tour;
};