import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { nanoid } from "nanoid";

// Get all tours for user
export const getTours = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    return await ctx.db
      .query("tours")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();
  },
});

// Create tour with preset steps if type is ecommerce/saas
export const createTour = mutation({
  args: {
    name: v.string(),
    type: v.union(v.literal("ecommerce"), v.literal("saas"), v.literal("custom")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const now = Date.now();
    const tourId = await ctx.db.insert("tours", {
      userId: identity.subject,
      name: args.name,
      type: args.type,
      createdAt: now,
      updatedAt: now,
    });

    // Preset steps
    let presets = [];
    if (args.type === "ecommerce") {
      presets = [
        { order: 1, title: "Welcome", description: "Intro to store", content: "<p>Welcome to our shop!</p>", targetElement: "#header" },
        { order: 2, title: "Browse Products", description: "Find items", content: "<p>Check out our categories.</p>", targetElement: "#products" },
        { order: 3, title: "Add to Cart", description: "Select and add", content: "<p>Click 'Add to Cart'.</p>", targetElement: ".add-to-cart" },
        { order: 4, title: "Checkout", description: "Review order", content: "<p>Proceed to checkout.</p>", targetElement: "#cart" },
        { order: 5, title: "Payment", description: "Complete purchase", content: "<p>Enter payment details.</p>", targetElement: "#payment-form" },
      ];
    } else if (args.type === "saas") {
      presets = [
        { order: 1, title: "Dashboard Overview", description: "Main hub", content: "<p>See your metrics here.</p>", targetElement: "#dashboard" },
        { order: 2, title: "Create Project", description: "Start new", content: "<p>Click 'New Project'.</p>", targetElement: ".new-project" },
        { order: 3, title: "Invite Team", description: "Collaborate", content: "<p>Add members.</p>", targetElement: "#team" },
        { order: 4, title: "Integrations", description: "Connect tools", content: "<p>Set up APIs.</p>", targetElement: "#integrations" },
        { order: 5, title: "Analytics", description: "Track progress", content: "<p>View reports.</p>", targetElement: "#analytics" },
      ];
    }
    // For custom, no presets - user adds later

    for (const preset of presets) {
      await ctx.db.insert("steps", {
        tourId,
        stepId: nanoid(),
        ...preset,
      });
    }

    return tourId;
  },
});

// Update tour
export const updateTour = mutation({
  args: {
    id: v.id("tours"),
    name: v.optional(v.string()),
    type: v.optional(v.union(v.literal("ecommerce"), v.literal("saas"), v.literal("custom"))),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const tour = await ctx.db.get(args.id);
    if (!tour || tour.userId !== identity.subject) throw new Error("Not found");

    return await ctx.db.patch(args.id, {
      name: args.name ?? tour.name,
      type: args.type ?? tour.type,
      updatedAt: Date.now(),
    });
  },
});

// Delete tour
export const deleteTour = mutation({
  args: { id: v.id("tours") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const tour = await ctx.db.get(args.id);
    if (!tour || tour.userId !== identity.subject) throw new Error("Not found");

    // Delete steps
    const steps = await ctx.db
      .query("steps")
      .withIndex("by_tour", (q) => q.eq("tourId", args.id))
      .collect();
    for (const step of steps) {
      await ctx.db.delete(step._id);
    }

    // Delete analytics
    const analytics = await ctx.db
      .query("analytics")
      .withIndex("by_tour", (q) => q.eq("tourId", args.id))
      .collect();
    for (const event of analytics) {
      await ctx.db.delete(event._id);
    }

    await ctx.db.delete(args.id);
  },
});

// Step CRUD
export const getSteps = query({
  args: { tourId: v.id("tours") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("steps")
      .withIndex("by_tour_order", (q) => q.eq("tourId", args.tourId))
      .collect();
  },
});

export const createStep = mutation({
  args: {
    tourId: v.id("tours"),
    title: v.string(),
    description: v.string(),
    content: v.string(),
    targetElement: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const tour = await ctx.db.get(args.tourId);
    if (!tour || tour.userId !== identity.subject) throw new Error("Not found");

    const existingSteps = await ctx.db
      .query("steps")
      .withIndex("by_tour", (q) => q.eq("tourId", args.tourId))
      .collect();

    return await ctx.db.insert("steps", {
      tourId: args.tourId,
      stepId: nanoid(),
      order: existingSteps.length + 1,
      title: args.title,
      description: args.description,
      content: args.content,
      targetElement: args.targetElement,
    });
  },
});

export const updateStep = mutation({
  args: {
    id: v.id("steps"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    content: v.optional(v.string()),
    targetElement: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const step = await ctx.db.get(args.id);
    if (!step) throw new Error("Not found");

    const tour = await ctx.db.get(step.tourId);
    if (!tour || tour.userId !== identity.subject) throw new Error("Unauthorized");

    return await ctx.db.patch(args.id, {
      title: args.title ?? step.title,
      description: args.description ?? step.description,
      content: args.content ?? step.content,
      targetElement: args.targetElement ?? step.targetElement,
      order: args.order ?? step.order,
    });
  },
});

export const deleteStep = mutation({
  args: { id: v.id("steps") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const step = await ctx.db.get(args.id);
    if (!step) throw new Error("Not found");

    const tour = await ctx.db.get(step.tourId);
    if (!tour || tour.userId !== identity.subject) throw new Error("Unauthorized");

    await ctx.db.delete(args.id);

    // Reorder remaining steps
    const remainingSteps = await ctx.db
      .query("steps")
      .withIndex("by_tour_order", (q) => q.eq("tourId", step.tourId))
      .collect();
    for (let i = 0; i < remainingSteps.length; i++) {
      await ctx.db.patch(remainingSteps[i]._id, { order: i + 1 });
    }
  },
});