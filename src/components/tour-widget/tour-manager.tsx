'use client';

import { useState, useEffect } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import type { Id, Doc } from '../../../convex/_generated/dataModel';
import { TourWidget } from './tour-widget';

interface TourStep {
  id: string;
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  targetElement?: string;
}

interface TourData {
  id: string;
  name: string;
  type: 'ecommerce' | 'saas' | 'custom';
  steps: TourStep[];
}

export function TourManager() {
  const [showTour, setShowTour] = useState(false);
  const tourId: string | null = typeof window !== 'undefined'
    ? (document.getElementById('tour-master-script')?.getAttribute('data-tour-id')
       || new URLSearchParams(window.location.search).get('tourId'))
    : null;

  const tour = useQuery(
    tourId ? api.tours.getTour : null,
    tourId ? { id: tourId as Id<'tours'> } : undefined
  ) as Doc<'tours'> | undefined | null;

  useEffect(() => {
    if (tour && !showTour) {
      const id = setTimeout(() => setShowTour(true), 500);
      return () => clearTimeout(id);
    }
  }, [tour, showTour]);
  
  const handleTourComplete = () => {
    console.log('Tour completed');
    // In a real implementation, send completion event to analytics
    setShowTour(false);
  };
  
  const handleTourClose = () => {
    console.log('Tour skipped');
    // In a real implementation, send skip event to analytics
    setShowTour(false);
  };
  
  if (tour === undefined) {
    return (
      <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-white p-4 shadow-lg">
        <div className="flex items-center">
          <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-indigo-600"></div>
          <span className="ml-2 text-sm text-gray-600">Loading tour...</span>
        </div>
      </div>
    );
  }
  
  if (!tour) {
    return (
      <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-white p-4 shadow-lg">
        <div className="text-sm text-gray-600">Tour not found</div>
      </div>
    );
  }
  
  return (
    <>
      {showTour && (
        <TourWidget
          tourId={String(tour._id)}
          steps={(tour.steps || []) as TourStep[]}
          onComplete={handleTourComplete}
          onClose={handleTourClose}
        />
      )}
      
      {/* Demo element for targeting */}
      <div className="navigation-example fixed bottom-4 left-4 z-40 rounded-lg bg-indigo-100 p-4">
        <p className="text-sm text-indigo-800">Example target element</p>
      </div>
    </>
  );
}
