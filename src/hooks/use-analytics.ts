import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { Id } from '../../convex/_generated/dataModel';

export const useTourAnalytics = (tourId: string) => {
	const analytics = useQuery(
		api.analytics.getTourAnalytics,
		{ tourId: tourId as Id<'tours'> }
	);

	// FIX 1: Map the expected name 'startTour' to the actual mutation 'startSession'
	const startTour = useMutation(api.analytics.startSession);

	// FIX 2: Map the expected name 'completeStep' to the actual mutation 'recordStepEvent'
	const completeStep = useMutation(api.analytics.recordStepEvent);
    
	// FIX 3: Use the correct function names from the analytics.ts file
	const completeTour = useMutation(api.analytics.completeTour);
	const abandonTour = useMutation(api.analytics.abandonTour);

	return {
		analytics,
		startTour, // Returning the function named startSession
		completeStep, // Returning the function named recordStepEvent
		completeTour,
		abandonTour,
	};
};

// NOTE on useOwnerAnalyticsSummary: 
// The argument name is 'userId' (not 'ownerId') in the component, and 'userId' 
// is required to be Id<'users'> in the handler. We must apply the cast/skip pattern.
export const useOwnerAnalyticsSummary = (ownerId: string | undefined) => {
    // We assume the hook receives ownerId (which can be undefined/string)
    // FIX 4: Change argument name to userId in the function signature for clarity/consistency
    const userId = ownerId; 
    
    // FIX 5: Apply the required Id type casting and "skip" pattern
	return useQuery(
        api.analytics.getOwnerAnalyticsSummary, 
        userId ? { userId: userId as Id<'users'> } : "skip"
    );
};
