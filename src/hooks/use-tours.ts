import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';

// The input is a string which represents the owner/user ID
export const useTours = (ownerId: string) => {
    const userId = ownerId; 
    
	const tours = useQuery(api.tours.listTours, { userId: userId as Id<'users'> });

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
	// FIX: Pass the function reference directly (no conditional logic)
	const tour = useQuery(
		api.tours.getTour,
        // FIX: Rely on the second argument to pass 'skip' if tourId is null
		tourId ? { id: tourId } : 'skip'
	);

	return tour;
};
