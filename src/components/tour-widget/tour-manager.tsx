// ./src/components/tour-widget/tour-manager.tsx
'use client';

import { useState, useEffect } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import type { Id, Doc } from '../../../convex/_generated/dataModel';
import { TourWidget } from './tour-widget';

interface TourStep {
	id: string; // Mapped from _id
	title: string;
	content: string;
	position: 'top' | 'bottom' | 'left' | 'right'; // Required property
	targetElement?: string; // Required property
}

// FIX 1: Update the step type definition to reflect what is actually returned
// Assume the raw step data includes the necessary fields for the widget
type RawStep = {
	_id: Id<'steps'>;
	title: string;
	content: string;
	position: 'top' | 'bottom' | 'left' | 'right'; // Must be present
	targetElement?: string; // Must be present
	// Include any other step properties returned by the query here
}

// FIX 2: Update the TourDocWithSteps to contain the correctly typed RawStep array
type TourDocWithSteps = Doc<'tours'> & {
	steps: RawStep[];
	type: 'ecommerce' | 'saas' | 'custom' | 'educational';
};


interface TourData {
	id: string;
	name: string;
	type: 'ecommerce' | 'saas' | 'custom' | 'educational';
	steps: TourStep[];
}

export function TourManager() {
	const [showTour, setShowTour] = useState(false);
	const tourId: string | null = typeof window !== 'undefined'
		? (document.getElementById('tour-master-script')?.getAttribute('data-tour-id')
			|| new URLSearchParams(window.location.search).get('tourId'))
		: null;

	const tour = useQuery(
		api.tours.getTour,
		tourId ? { id: tourId as Id<'tours'> } : 'skip'
	) as TourDocWithSteps | undefined | null;

	useEffect(() => {
		if (tour && !showTour) {
			const id = setTimeout(() => setShowTour(true), 500);
			return () => clearTimeout(id);
		}
	}, [tour, showTour]);

	const handleTourComplete = () => {
		console.log('Tour completed');
		setShowTour(false);
	};

	const handleTourClose = () => {
		console.log('Tour skipped');
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

	// FIX 3: Map the raw steps data to the required TourStep structure
	const tourSteps: TourStep[] = tour.steps.map(step => ({
		// Map _id to id
		id: String(step._id),
		title: step.title,
		content: step.content,
		position: step.position, // Now correctly included in the RawStep type
		targetElement: step.targetElement, // Now correctly included
	}));

	return (
		<>
			{showTour && (
				<TourWidget
					tourId={String(tour._id)}
					// FIX 4: Pass the mapped array
					steps={tourSteps}
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
