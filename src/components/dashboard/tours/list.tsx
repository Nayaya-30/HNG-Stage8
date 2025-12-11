// ./src/components/dashboard/tours/list.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	PlusIcon,
	PlayIcon,
	PencilIcon,
	TrashIcon,
	DocumentDuplicateIcon
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import Link from 'next/link';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
// FIX 1: Import Id type for casting
import type { Id, Doc } from '../../../../convex/_generated/dataModel';
import { useOwnerId } from '@/hooks/use-user';

// NOTE: Update UITour based on what is actually present on the Doc
type BaseTour = Doc<'tours'> & {
	totalSteps: number; // Assuming this is available
	isActive: boolean; // Assuming this determines status
	tourType: 'ecommerce' | 'saas' | 'custom' | 'educational';
};

type UITour = BaseTour & {
	status: 'draft' | 'active';
	stepsCount: number;
	type: 'ecommerce' | 'saas' | 'custom' | 'educational';
};


export function TourList() {
	// FIX 2: Rename variable to match the Convex argument name
	const userId = useOwnerId();

	// FIX 3: Use 'userId' for the argument and apply the "skip" pattern
	const rawTours = useQuery(
		api.tours.listTours,
		userId ? { userId: userId as Id<'users'> } : "skip"
	);

	const deleteTourMutation = useMutation(api.tours.deleteTour);

	const deleteTour = async (id: string) => {
		if (confirm('Are you sure you want to delete this tour?')) {
			await deleteTourMutation({ id: id as Id<'tours'> });
		}
	};

	if (rawTours === undefined) {
		return <div className="p-4 text-center">Loading...</div>;
	}

	// FIX 4: Map raw data to UITour structure for safe rendering
	const tours: UITour[] = rawTours.map((tour: BaseTour) => ({
		...tour,
		status: tour.isActive ? 'active' : 'draft',
		stepsCount: tour.totalSteps || 0, // Rely on totalSteps
		type: tour.tourType, // Map tourType to type
	}));

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>Your Tours</CardTitle>
				<Link href="/dashboard/tours/new" passHref>
					<Button>
						<div className="flex items-center">
							<PlusIcon className="mr-2 h-4 w-4" />
							Create New Tour
						</div>
					</Button>
				</Link>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{tours.length === 0 ? (
						<p className="text-center text-gray-500 py-4">No tours found. Create one to get started.</p>
					) : (
						tours.map((tour: UITour) => (
							<div
								key={tour._id}
								className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50"
							>
								<div className="flex items-center space-x-4">
									<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
										<PlayIcon className="h-5 w-5 text-indigo-600" />
									</div>
									<div>
										<h3 className="font-medium">{tour.name}</h3>
										<div className="flex items-center space-x-2 text-sm text-gray-500">
											{/* FIX 5: Use stepsCount instead of tour.steps?.length */}
											<span>{tour.stepsCount} steps</span>
											<span>•</span>
											{/* FIX 6: Use _creationTime since createdAt is not on the base Doc */}
											<span>{format(tour._creationTime, 'MMM d, yyyy')}</span>
											<span>•</span>
											<Badge
												variant={tour.status === 'active' ? 'default' : 'secondary'}
												className="capitalize"
											>
												{tour.status}
											</Badge>
											<span>•</span>
											<Badge variant="outline" className="capitalize">
												{tour.type}
											</Badge>
										</div>
									</div>
								</div>

								<div className="flex items-center space-x-2">
									<Link href={`/dashboard/tours/${tour._id}`}>
										<Button variant="ghost" size="icon">
											<PencilIcon className="h-4 w-4" />
										</Button>
									</Link>
									<Button variant="ghost" size="icon">
										<DocumentDuplicateIcon className="h-4 w-4" />
									</Button>
									<Button
										variant="ghost"
										size="icon"
										onClick={() => deleteTour(tour._id)}
									>
										<TrashIcon className="h-4 w-4" />
									</Button>
								</div>
							</div>
						))
					)}
				</div>
			</CardContent>
		</Card>
	);
}
