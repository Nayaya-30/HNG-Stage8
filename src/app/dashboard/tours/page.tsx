// ./src/app/dashboard/tours/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
	PlusIcon,
	PlayIcon,
	PencilIcon,
	TrashIcon,
	DocumentDuplicateIcon,
	MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import Link from 'next/link';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import type { Id, Doc } from '../../../../convex/_generated/dataModel';
import { useOwnerId } from '@/hooks/use-user';

// FIX 1: Update UITour definition to use derived fields and safe access
// Remove the optional status/type/steps from the intersection, as they are derived/computed here
type UITour = Doc<'tours'> & {
	// Use properties from Doc<'tours'> for safe access
};

export default function ToursPage() {
	const [searchTerm, setSearchTerm] = useState('');

	// Renamed variable to align with the required Convex argument (userId)
	const userId = useOwnerId();

	// FIX 2: Pass userId instead of ownerId
	// Also, cast userId to Id<'users'> if it exists, as listTours requires it
	const tours = useQuery(
		api.tours.listTours,
		userId ? { userId: userId as Id<'users'> } : "skip"
	);

	const deleteTourMutation = useMutation(api.tours.deleteTour);

	const handleSearch = (term: string) => {
		setSearchTerm(term);
	};

	const deleteTour = async (id: string) => {
		if (confirm('Are you sure you want to delete this tour?')) {
			await deleteTourMutation({ id: id as Id<'tours'> });
		}
	};

	// FIX 3: Map the tours array to include the derived fields (status, steps.length, type) 
	// before filtering/rendering.
	const computedTours = tours?.map((tour) => {
		// Assuming tour.isActive determines status
		const status = tour.isActive ? 'active' : 'draft';
		// tourType is already on the Doc, no change needed for `type` property access

		return {
			...tour,
			status,
			stepsCount: tour.totalSteps || 0, // Use totalSteps from the schema
			type: tour.tourType, // Map tourType back to 'type' for cleaner use in JSX
		};
	}) || [];

	// FIX 4: Use the computed fields for filtering
	const filteredTours = computedTours.filter((tour) =>
		tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
		tour.type.toLowerCase().includes(searchTerm.toLowerCase())
	) || [];

	if (tours === undefined) {
		return <div className="p-8 text-center text-gray-500">Loading tours...</div>;
	}

	return (
		<div className="space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Tours</h1>
					<p className="mt-1 text-gray-500">
						Manage your product tours and onboarding experiences
					</p>
				</div>
				<Link href="/dashboard/tours/new">
					<Button>
						<PlusIcon className="mr-2 h-4 w-4" />
						Create Tour
					</Button>
				</Link>
			</div>

			<Card>
				<CardHeader>
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<CardTitle>All Tours</CardTitle>
						<div className="relative w-full sm:w-64">
							<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
								<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
							</div>
							<Input
								type="text"
								placeholder="Search tours..."
								value={searchTerm}
								onChange={(e) => handleSearch(e.target.value)}
								className="pl-10"
							/>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{filteredTours.length === 0 ? (
							<div className="text-center py-12">
								<p className="text-gray-500">
									{searchTerm ? 'No tours match your search.' : 'No tours found.'}
								</p>
								{!searchTerm && (
									<Link href="/dashboard/tours/new">
										<Button className="mt-4">
											<PlusIcon className="mr-2 h-4 w-4" />
											Create Your First Tour
										</Button>
									</Link>
								)}
							</div>
						) : (
							// Use the computed tours which now have the 'status', 'type', and 'stepsCount'
							filteredTours.map((tour) => (
								<div
									key={tour._id}
									className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border p-4 hover:bg-gray-50"
								>
									<div className="flex items-center space-x-4">
										<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
											<PlayIcon className="h-5 w-5 text-indigo-600" />
										</div>
										<div>
											<h3 className="font-medium">{tour.name}</h3>
											<div className="flex flex-wrap items-center gap-2 mt-1">
												<span className="text-sm text-gray-500">
													{tour.stepsCount} steps
												</span>
												<span className="text-gray-300">•</span>
												<span className="text-sm text-gray-500">
													{format(tour._creationTime, 'MMM d, yyyy')}
												</span>
												<span className="text-gray-300">•</span>
												<Badge
													variant={tour.status === 'active' ? 'default' : 'secondary'}
													className="capitalize"
												>
													{tour.status}
												</Badge>
												<span className="text-gray-300">•</span>
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
		</div>
	);
}
