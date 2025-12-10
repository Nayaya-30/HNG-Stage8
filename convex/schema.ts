import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
	tours: defineTable({
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
		ownerId: v.string(), // User ID who owns this tour
		createdAt: v.number(),
		updatedAt: v.number(),
	})
		.index('by_owner', ['ownerId'])
		.index('by_status', ['status']),

	tourAnalytics: defineTable({
		tourId: v.string(),
		userId: v.string(),
		startedAt: v.number(),
		completedAt: v.optional(v.number()),
		abandonedAt: v.optional(v.number()),
		stepProgress: v.array(
			v.object({
				stepId: v.string(),
				startedAt: v.number(),
				completedAt: v.optional(v.number()),
			})
		),
	})
		.index('by_tour', ['tourId'])
		.index('by_user', ['userId']),

	users: defineTable({
		name: v.string(),
		email: v.string(),
		createdAt: v.number(),
	}).index('by_email', ['email']),
});
