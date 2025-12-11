import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';

export const useTours = (ownerId: string) => {
  const tours = useQuery(api.tours.listTours, { ownerId });
  
  const createTour = useMutation(api.tours.createTour);
  const updateTour = useMutation(api.tours.updateTour);
  const deleteTour = useMutation(api.tours.deleteTour);
  
  return {
    tours,
    createTour,
    updateTour,
    deleteTour,
  };
};

export const useTour = (tourId: Id<'tours'> | null) => {
  const tour = useQuery(
    tourId ? api.tours.getTour : null,
    tourId ? { id: tourId } : undefined
  );
  
  return tour;
};
