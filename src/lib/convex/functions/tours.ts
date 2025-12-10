import { v } from 'convex/values';
import { mutation, query } from '../../../../convex/_generated/server';
import type {
	MutationCtx,
	QueryCtx,
} from '../../../../convex/_generated/server';
import { Id } from '../../../../convex/_generated/dataModel';

// Shared Types
type TourType = 'ecommerce' | 'saas' | 'custom';
type TourStatus = 'draft' | 'active';
type StepPosition = 'top' | 'bottom' | 'left' | 'right';

interface TourStep {
	id: string;
	title: string;
	content: string;
	position: StepPosition;
	targetElement?: string;
}

// Get all tours for a user
export const listTours = query({
	args: {
		ownerId: v.string(),
	},
	handler: async (ctx: QueryCtx, args: { ownerId: string }) => {
		return await ctx.db
			.query('tours')
			.withIndex('by_owner', (q) => q.eq('ownerId', args.ownerId))
			.collect();
	},
});

// Get a specific tour by ID
export const getTour = query({
	args: {
		id: v.id('tours'),
	},
	handler: async (ctx: QueryCtx, args: { id: Id<'tours'> }) => {
		return await ctx.db.get(args.id);
	},
});

// Create a new tour
export const createTour = mutation({
	args: {
		name: v.string(),
		type: v.union(
			v.literal('ecommerce'),
			v.literal('saas'),
			v.literal('custom')
		),
		status: v.union(v.literal('draft'), v.literal('active')),
		steps: v.array(
			v.object({
				id: v.string(),
				title: v.string(),
				content: v.string(),
				position: v.union(
					v.literal('top'),
					v.literal('bottom'),
					v.literal('left'),
					v.literal('right')
				),
				targetElement: v.optional(v.string()),
			})
		),
		ownerId: v.string(),
	},
	handler: async (
		ctx: MutationCtx,
		args: {
			name: string;
			type: TourType;
			status: TourStatus;
			steps: TourStep[];
			ownerId: string;
		}
	) => {
		const now = Date.now();
		const tourId = await ctx.db.insert('tours', {
			name: args.name,
			type: args.type,
			status: args.status,
			steps: args.steps,
			ownerId: args.ownerId,
			createdAt: now,
			updatedAt: now,
		});

		return tourId;
	},
});

// Update an existing tour
export const updateTour = mutation({
	args: {
		id: v.id('tours'),
		name: v.string(),
		type: v.union(
			v.literal('ecommerce'),
			v.literal('saas'),
			v.literal('custom')
		),
		status: v.union(v.literal('draft'), v.literal('active')),
		steps: v.array(
			v.object({
				id: v.string(),
				title: v.string(),
				content: v.string(),
				position: v.union(
					v.literal('top'),
					v.literal('bottom'),
					v.literal('left'),
					v.literal('right')
				),
				targetElement: v.optional(v.string()),
			})
		),
	},
	handler: async (
		ctx: MutationCtx,
		args: {
			id: Id<'tours'>;
			name: string;
			type: TourType;
			status: TourStatus;
			steps: TourStep[];
		}
	) => {
		const now = Date.now();
		await ctx.db.patch(args.id, {
			name: args.name,
			type: args.type,
			status: args.status,
			steps: args.steps,
			updatedAt: now,
		});

		return args.id;
	},
});

// Delete a tour
export const deleteTour = mutation({
	args: {
		id: v.id('tours'),
	},
	handler: async (ctx: MutationCtx, args: { id: Id<'tours'> }) => {
		await ctx.db.delete(args.id);
		return args.id;
	},
});

