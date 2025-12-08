import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Public mutation for widget to track events (no auth required, but validate tourId)
export const trackEvent = mutation({
  args: {
    tourId: v.id("tours"),
    stepId: v.string(),
    eventType: v.union(v.literal("start"), v.literal("complete"), v.literal("skip"), v.literal("resume")),
    sessionId: v.string(),
    userAgent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Validate tour exists (public, no auth)
    const tour = await ctx.db.get(args.tourId);
    if (!tour) throw new Error("Tour not found");

    return await ctx.db.insert("analytics", {
      ...args,
      timestamp: Date.now(),
    });
  },
});

// Get analytics for a tour (aggregated)
export const getAnalytics = query({
  args: { tourId: v.id("tours") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const tour = await ctx.db.get(args.tourId);
    if (!tour || tour.userId !== identity.subject) throw new Error("Not found");

    const events = await ctx.db
      .query("analytics")
      .withIndex("by_tour", (q) => q.eq("tourId", args.tourId))
      .collect();

    // Aggregate: completion rate, skips per step, etc.
    const steps = await ctx.db
      .query("steps")
      .withIndex("by_tour", (q) => q.eq("tourId", args.tourId))
      .collect();

    const uniqueSessions = new Set(events.map((e) => e.sessionId)).size;

    const aggregates = steps.map((step) => {
      const stepEvents = events.filter((e) => e.stepId === step.stepId);
      const starts = stepEvents.filter((e) => e.eventType === "start").length;
      const completes = stepEvents.filter((e) => e.eventType === "complete").length;
      const skips = stepEvents.filter((e) => e.eventType === "skip").length;
      const resumes = stepEvents.filter((e) => e.eventType === "resume").length;

      return {
        stepId: step.stepId,
        title: step.title,
        starts,
        completes,
        skips,
        resumes,
        completionRate: starts > 0 ? (completes / starts) * 100 : 0,
      };
    });

    const overallCompletion = uniqueSessions > 0 
      ? (events.filter((e) => e.eventType === "complete" && e.stepId === steps[steps.length - 1]?.stepId).length / uniqueSessions) * 100 
      : 0;

    return { aggregates, overallCompletion, totalSessions: uniqueSessions, totalEvents: events.length };
  },
});