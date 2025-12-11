// convex/auth.ts
import { mutation } from './_generated/server';
import type { MutationCtx } from './_generated/server';
import { v } from 'convex/values';
import { nanoid } from 'nanoid';

export const signUp = mutation({
  args: {
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx: MutationCtx, args: { name: string; email: string }) => {
    const existing = await ctx.db
      .query('users')
      .withIndex('by_email', (q) => q.eq('email', args.email))
      .collect();

    if (existing.length > 0) {
      throw new Error('An account with this email already exists');
    }
    
    // FIX: Must provide all required fields defined in schema.ts
    const id = await ctx.db.insert('users', {
      name: args.name,
      email: args.email,
      authId: `local-auth-${nanoid(16)}`, // Placeholder for local sign-up
      plan: "free",
      apiKey: `pk_local_${nanoid(32)}`, // Placeholder API Key
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return id;
  },
});

export const signIn = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx: MutationCtx, args: { email: string }) => {
    const users = await ctx.db
      .query('users')
      .withIndex('by_email', (q) => q.eq('email', args.email))
      .collect();

    if (users.length === 0) {
      throw new Error('Invalid email or password');
    }

    return users[0]._id;
  },
});

export const requestPasswordReset = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx: MutationCtx, args: { email: string }) => {
    const existing = await ctx.db
      .query('users')
      .withIndex('by_email', (q) => q.eq('email', args.email))
      .collect();
    void existing;
    return { ok: true };
  },
});
