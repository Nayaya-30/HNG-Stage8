import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export const useTourAnalytics = (tourId: string) => {
  const analytics = useQuery(api.analytics.getTourAnalytics, { tourId });
  
  const startTour = useMutation(api.analytics.startTour);
  const completeStep = useMutation(api.analytics.completeStep);
  const completeTour = useMutation(api.analytics.completeTour);
  const abandonTour = useMutation(api.analytics.abandonTour);
  
  return {
    analytics,
    startTour,
    completeStep,
    completeTour,
    abandonTour,
  };
};

export const useOwnerAnalyticsSummary = (ownerId: string) => {
  return useQuery(api.analytics.getOwnerAnalyticsSummary, { ownerId });
};
