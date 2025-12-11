'use client';

import { useState, useEffect } from 'react';
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
  const [tourData, setTourData] = useState<TourData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showTour, setShowTour] = useState(false);

  // Extract tour ID from script tag or URL parameter
  useEffect(() => {
    const loadTour = async () => {
      try {
        // In a real implementation, this would fetch from your API
        // For demo purposes, we'll use mock data
        
        // Get tour ID from data attribute in script tag
        const scriptTag = document.getElementById('tour-master-script');
        const tourId = scriptTag?.getAttribute('data-tour-id') || 
                      new URLSearchParams(window.location.search).get('tourId') ||
                      'default';
        
        // Mock tour data - replace with actual API call
        const mockTourData: TourData = {
          id: tourId,
          name: tourId === 'ecommerce' ? 'E-commerce Product Walkthrough' : 
                tourId === 'saas' ? 'SaaS Onboarding Flow' : 
                'Custom Feature Introduction',
          type: tourId === 'ecommerce' ? 'ecommerce' : 
                tourId === 'saas' ? 'saas' : 
                'custom',
          steps: [
            {
              id: 'step_1',
              title: 'Welcome!',
              content: 'Thanks for checking out our tour widget. This is a demonstration of how the tour system works.',
              position: 'bottom'
            },
            {
              id: 'step_2',
              title: 'Interactive Elements',
              content: 'Notice how this tooltip points to specific elements on the page. You can click "Next" to continue.',
              position: 'bottom',
              targetElement: 'body'
            },
            {
              id: 'step_3',
              title: 'Navigation Controls',
              content: 'Use these buttons to navigate through the tour steps.',
              position: 'bottom',
              targetElement: '.navigation-example'
            },
            {
              id: 'step_4',
              title: 'Completion Tracking',
              content: 'When users finish the tour, completion events are sent to your analytics system.',
              position: 'bottom'
            },
            {
              id: 'step_5',
              title: 'Ready to Implement?',
              content: 'This widget can be easily embedded in any website with a simple script tag.',
              position: 'bottom'
            }
          ]
        };
        
        setTourData(mockTourData);
        setIsLoading(false);
        
        // Auto-start tour after a short delay
        setTimeout(() => {
          setShowTour(true);
        }, 1000);
      } catch (error) {
        console.error('Failed to load tour:', error);
        setIsLoading(false);
      }
    };
    
    loadTour();
  }, []);
  
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
  
  if (isLoading) {
    return (
      <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-white p-4 shadow-lg">
        <div className="flex items-center">
          <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-indigo-600"></div>
          <span className="ml-2 text-sm text-gray-600">Loading tour...</span>
        </div>
      </div>
    );
  }
  
  if (!tourData) {
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
          tourId={tourData.id}
          steps={tourData.steps}
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