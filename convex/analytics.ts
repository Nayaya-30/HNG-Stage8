import { mutation, query } from './_generated/server';
import { Id } from './_generated/dataModel';
import { v } from 'convex/values';

// Record when a user starts a tour
export const startTour = mutation({
	args: {
		tourId: v.string(),
		userId: v.string(),
	},
	handler: async (ctx, args) => {
		const now = Date.now();
		const analyticsId = await ctx.db.insert('tourAnalytics', {
			tourId: args.tourId,
			userId: args.userId,
			startedAt: now,
			stepProgress: [],
		});

		return analyticsId;
	},
});

// Record when a user completes a step
export const completeStep = mutation({
	args: {
		analyticsId: v.id('tourAnalytics'),
		stepId: v.string(),
	},
	handler: async (ctx, args) => {
		const analyticsRecord = await ctx.db.get(args.analyticsId);
		if (!analyticsRecord) {
			throw new Error('Analytics record not found');
		}

		const now = Date.now();
		const updatedProgress = [...analyticsRecord.stepProgress];

		// Find if step already exists
		const stepIndex = updatedProgress.findIndex(
			(step) => step.stepId === args.stepId
		);

		if (stepIndex >= 0) {
			// Update existing step
			updatedProgress[stepIndex] = {
				...updatedProgress[stepIndex],
				completedAt: now,
			};
		} else {
			// Add new step
			updatedProgress.push({
				stepId: args.stepId,
				startedAt: now,
				completedAt: now,
			});
		}

		await ctx.db.patch(args.analyticsId, {
			stepProgress: updatedProgress,
		});

		return args.analyticsId;
	},
});

// Record when a user completes a tour
export const completeTour = mutation({
	args: {
		analyticsId: v.id('tourAnalytics'),
	},
	handler: async (ctx, args) => {
		const now = Date.now();
		await ctx.db.patch(args.analyticsId, {
			completedAt: now,
		});

		return args.analyticsId;
	},
});

// Record when a user abandons a tour
export const abandonTour = mutation({
	args: {
		analyticsId: v.id('tourAnalytics'),
	},
	handler: async (ctx, args) => {
		const now = Date.now();
		await ctx.db.patch(args.analyticsId, {
			abandonedAt: now,
		});

		return args.analyticsId;
	},
});

// Get analytics for a specific tour
export const getTourAnalytics = query({
	args: {
		tourId: v.string(),
	},
	handler: async (ctx, args) => {
		const analytics = await ctx.db
			.query('tourAnalytics')
			.withIndex('by_tour', (q) => q.eq('tourId', args.tourId))
			.collect();

		// Calculate completion rate
		const totalStarted = analytics.length;
		const totalCompleted = analytics.filter((a) => a.completedAt).length;
		const completionRate =
			totalStarted > 0 ? (totalCompleted / totalStarted) * 100 : 0;

		// Calculate step completion rates
		const stepCompletion: Record<
			string,
			{ started: number; completed: number }
		> = {};

		for (const record of analytics) {
			for (const step of record.stepProgress) {
				if (!stepCompletion[step.stepId]) {
					stepCompletion[step.stepId] = { started: 0, completed: 0 };
				}
				stepCompletion[step.stepId].started += 1;
				if (step.completedAt) {
					stepCompletion[step.stepId].completed += 1;
				}
			}
		}

		const stepCompletionRates = Object.entries(stepCompletion).map(
			([stepId, data]) => ({
				stepId,
				completionRate:
					data.started > 0
						? (data.completed / data.started) * 100
						: 0,
			})
		);

		return {
			totalStarted,
			totalCompleted,
			completionRate,
			stepCompletionRates,
		};
	},
});

// Get recent activity across all tours
export const getRecentActivity = query({
	args: {},
	handler: async (ctx) => {
		const recentAnalytics = await ctx.db
			.query('tourAnalytics')
			.order('desc')
			.take(10);

		const activities = await Promise.all(
			recentAnalytics.map(async (record) => {
				let tourName = 'Unknown Tour';
                try {
                    const tour = await ctx.db.get(record.tourId as Id<'tours'>);
                    if (tour && 'name' in tour) {
                        tourName = tour.name as string;
                    }
                } catch (e) {
                    console.error('Failed to fetch tour', e);
                }

				return {
					id: record._id,
					user: record.userId || 'Anonymous',
					action: record.completedAt ? 'completed' : 'started',
					target: tourName,
					timestamp: record._creationTime,
				};
			})
		);

		return activities;
	},
});
