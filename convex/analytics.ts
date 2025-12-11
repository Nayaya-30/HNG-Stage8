// convex/analytics.ts
import { mutation, query } from './_generated/server';
import type { MutationCtx, QueryCtx } from './_generated/server';
import { Id, Doc } from './_generated/dataModel';
import { v } from 'convex/values';
import { nanoid } from 'nanoid';

// Helper to validate and fetch a tour
async function getTourWithSteps(ctx: QueryCtx | MutationCtx, tourId: Id<'tours'>) {
	const tour = await ctx.db.get(tourId);
	if (!tour) throw new Error('Tour not found');

	const steps = await ctx.db
		.query('steps')
		.withIndex('by_tourId', (q) => q.eq('tourId', tour._id))
		.order('asc')
		.collect();

	return { tour, steps };
}

// Record when a user starts a tour (creates a session)
// convex/analytics.ts - Inside the file, replace the existing startSession function
// Record when a user starts a tour (creates a session)
export const startSession = mutation({
	args: {
		tourId: v.id('tours'), // Changed to Id<'tours'> for type safety
		userId: v.optional(v.id('users')),
        userAgent: v.string(),
        browser: v.string(),
        device: v.string(),
        os: v.string(),
        screenResolution: v.string(),
        pageUrl: v.string(),
	},
    handler: async (ctx: MutationCtx, args) => {
		const now = Date.now();
        // Use an external function (like getTourWithSteps) if you need all steps
        const tour = await ctx.db.get(args.tourId);
        
        if (!tour) {
            throw new Error("Tour not found or steps not available.");
        }
        
        const sessionId = nanoid();
        
		const session = await ctx.db.insert('sessions', {
			tourId: tour._id,
			userId: args.userId,
			startedAt: now,
			sessionId,
            userAgent: args.userAgent,
            browser: args.browser,
            device: args.device,
            os: args.os,
            screenResolution: args.screenResolution,
            pageUrl: args.pageUrl,
            
            // Initial state (using totalSteps from tour document)
            status: 'in_progress',
            totalSteps: tour.totalSteps, // Use the field from the schema
            stepsCompleted: 0,
            stepsSkipped: 0,
            currentStep: 1, // Start at step 1
            // Placeholder for other required fields
            pageTitle: "",
            referrer: "",
		});

		// FIX: The insert function returns the Id<"sessions"> directly.
        // It does not have a ._id property.
		return session; 
	},
});

// Record a step event (viewed, completed, skipped, etc.)
export const recordStepEvent = mutation({
	args: {
		sessionId: v.id('sessions'),
		stepId: v.string(),
		stepOrder: v.number(),
		eventType: v.string(), // Rely on schema validation for the union type
		timeOnStep: v.optional(v.number()),
	},
	handler: async (ctx: MutationCtx, args) => {
		const session = await ctx.db.get(args.sessionId);
		if (!session) {
			throw new Error('Session record not found');
		}

		const now = Date.now();

		// 1. Record the event
		await ctx.db.insert('stepEvents', {
			tourId: session.tourId,
			sessionId: session.sessionId, // Use the string sessionId from session record
			stepId: args.stepId,
			stepOrder: args.stepOrder,
			eventType: args.eventType as any, // Cast to any because the schema union type is complex
			timestamp: now,
			timeOnStep: args.timeOnStep,
		});

		// 2. Update the session status (stepsCompleted, currentStep)
		if (args.eventType === 'step_completed') {
			await ctx.db.patch(args.sessionId, {
				stepsCompleted: session.stepsCompleted + 1,
				currentStep: session.currentStep + 1,
				// duration logic is more complex and left out here for brevity
			});
		}

		if (args.eventType === 'step_skipped') {
			await ctx.db.patch(args.sessionId, {
				stepsSkipped: session.stepsSkipped + 1,
				currentStep: session.currentStep + 1,
			});
		}

		return args.sessionId;
	},
});


// Record when a user completes a tour (updates session status)
export const completeTour = mutation({
	args: {
		sessionId: v.id('sessions'), // Changed from analyticsId
	},
	handler: async (ctx: MutationCtx, args) => {
		const now = Date.now();
		const session = await ctx.db.get(args.sessionId);

		if (!session) throw new Error('Session not found');

		await ctx.db.patch(args.sessionId, {
			completedAt: now,
			status: 'completed',
			duration: now - session.startedAt, // Calculate duration
		});

		return args.sessionId;
	},
});

// Record when a user abandons a tour (updates session status)
export const abandonTour = mutation({
	args: {
		sessionId: v.id('sessions'), // Changed from analyticsId
	},
	handler: async (ctx: MutationCtx, args) => {
		const now = Date.now();
		await ctx.db.patch(args.sessionId, {
			abandonedAt: now,
			status: 'abandoned',
		});

		return args.sessionId;
	},
});

// Get analytics for a specific tour
export const getTourAnalytics = query({
	args: {
		tourId: v.id('tours'), // Changed to Id<'tours'> for type safety
	},
	handler: async (ctx: QueryCtx, args) => {
		const sessions = await ctx.db
			.query('sessions')
			.withIndex('by_tourId', (q) => q.eq('tourId', args.tourId))
			.collect();

		// Calculate completion rate
		const totalStarted = sessions.length;
		// Check for status 'completed'
		const totalCompleted = sessions.filter((s) => s.status === 'completed').length;

		const completionRate =
			totalStarted > 0 ? (totalCompleted / totalStarted) * 100 : 0;

		// Calculate step completion rates (using stepEvents)
		const stepEvents = await ctx.db
			.query('stepEvents')
			.withIndex('by_tourId', (q) => q.eq('tourId', args.tourId))
			.collect();

		const stepCompletion: Record<
			string,
			{ started: number; completed: number }
		> = {};

		for (const event of stepEvents) {
			// Treat step_viewed as "started" for the purpose of a rate calculation
			if (event.eventType === 'step_viewed') {
				if (!stepCompletion[event.stepId]) {
					stepCompletion[event.stepId] = { started: 0, completed: 0 };
				}
				stepCompletion[event.stepId].started += 1;
			}

			// Treat step_completed as "completed"
			if (event.eventType === 'step_completed') {
				if (!stepCompletion[event.stepId]) {
					stepCompletion[event.stepId] = { started: 0, completed: 0 };
				}
				stepCompletion[event.stepId].completed += 1;
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
			completionRate: Math.round(completionRate * 10) / 10,
			stepCompletionRates,
		};
	},
});

// Get recent activity across all tours (using sessions)
export const getRecentActivity = query({
	args: {},
	handler: async (ctx: QueryCtx) => {
		const recentSessions = await ctx.db
			.query('sessions')
			.withIndex('by_startedAt', (q) => q.gt("startedAt", 0))
			.order('desc')
			.take(10);

		const activities = await Promise.all(
			recentSessions.map(async (session) => {
				let tourName = 'Unknown Tour';
				try {
					const tour = await ctx.db.get(session.tourId);
					if (tour) {
						tourName = tour.name;
					}
				} catch (e) {
					console.error('Failed to fetch tour', e);
				}

				return {
					id: session._id,
					user: session.userId || 'Anonymous',
					// Action based on status, completedAt/abandonedAt is optional
					action: session.status,
					target: tourName,
					timestamp: session.startedAt,
				};
			})
		);

		return activities;
	},
});

// Owner-wide analytics summary for charts
export const getOwnerAnalyticsSummary = query({
	args: { userId: v.id('users') }, // Changed from ownerId: v.string()
	handler: async (ctx: QueryCtx, args: { userId: Id<'users'> }) => {
		const tours: Doc<'tours'>[] = await ctx.db
			.query('tours')
			.withIndex('by_userId', (q) => q.eq('userId', args.userId))
			.collect();

		const perTour = [] as Array<{
			tourId: Id<'tours'>;
			name: string;
			completionRate: number;
			stepsCount: number;
		}>;

		for (const tour of tours) {
			const sessions: Doc<'sessions'>[] = await ctx.db
				.query('sessions')
				.withIndex('by_tourId', (q) => q.eq('tourId', tour._id))
				.collect();

			const totalStarted = sessions.length;
			const totalCompleted = sessions.filter((s) => s.status === 'completed').length;
			const completionRate = totalStarted > 0 ? (totalCompleted / totalStarted) * 100 : 0;

			// Get step count from tour record
			const stepsCount = tour.totalSteps; // Field defined in the schema

			perTour.push({
				tourId: tour._id,
				name: tour.name,
				completionRate: Math.round(completionRate * 10) / 10,
				stepsCount,
			});
		}

		// Recent activity by day (started events)
		const recent: Doc<'sessions'>[] = await ctx.db
			.query('sessions')
			.withIndex('by_startedAt', (q) => q.gt("startedAt", 0))
			.order('desc')
			.take(50);

		const byDay = new Map<string, number>();
		for (const rec of recent) {
			const d = new Date(rec.startedAt);
			const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
			byDay.set(key, (byDay.get(key) || 0) + 1);
		}

		const completionsByDay = Array.from(byDay.entries())
			.slice(0, 7)
			.reverse()
			.map(([date, count]) => ({ date, completions: count }));

		return { perTour, completionsByDay };
	},
});
