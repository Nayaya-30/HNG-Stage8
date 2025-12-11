import { useMutation, useQuery } from 'convex/react';
import { api } from '@/lib/convex/_generated/api';

export const useTourAnalytics = (tourId: string) => {
  const analytics = useQuery(api.functions.analytics.getTourAnalytics, { tourId });
  
  const startTour = useMutation(api.functions.analytics.startTour);
  const completeStep = useMutation(api.functions.analytics.completeStep);
  const completeTour = useMutation(api.functions.analytics.completeTour);
  const abandonTour = useMutation(api.functions.analytics.abandonTour);
  
  return {
    analytics,
    startTour,
    completeStep,
    completeTour,
    abandonTour,
  };
};