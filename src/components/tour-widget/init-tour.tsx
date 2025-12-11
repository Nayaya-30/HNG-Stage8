'use client';

import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { TourManager } from './tour-manager';

// This function initializes the tour widget
export function initTour() {
  // Create a container div for the tour widget
  const container = document.createElement('div');
  container.id = 'tour-master-container';
  document.body.appendChild(container);
  
  // Create a root and render the TourManager component
  const root = createRoot(container);
  root.render(createElement(TourManager));
}

// Auto-initialize if script is loaded directly
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTour);
  } else {
    initTour();
  }
}