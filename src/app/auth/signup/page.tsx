"use client";

import React from "react";
import { ConvexClientProvider } from "@/lib/convex/client";

export default function SignUpPage() {
  return (
    <ConvexClientProvider>
      <div className="min-h-screen flex items-center justify-center bg-[#040816] relative p-4 text-slate-50">
        {/* subtle glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.15),_transparent_70%)]" />

        <div className="relative w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/80 shadow-[0_24px_80px_rgba(15,23,42,0.9)] p-6 md:p-8 backdrop-blur-sm">
          <div className="mb-6 space-y-2">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-slate-400">
              Welcome
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold">
              Create your OnboardX account
            </h1>
            <p className="text-sm text-slate-400">
              This is a demo sign-up screen just for your presentation. It doesn&apos;t
              actually create an account.
            </p>
          </div>

          <form className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">
                Full name
              </label>
              <input
                type="text"
                placeholder="Sandra Analaba"
                className="w-full rounded-xl bg-slate-950/80 border border-slate-700 px-3 py-2.5 text-sm outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-300"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">
                Work email
              </label>
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full rounded-xl bg-slate-950/80 border border-slate-700 px-3 py-2.5 text-sm outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-300"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl bg-slate-950/80 border border-slate-700 px-3 py-2.5 text-sm outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-300"
              />
            </div>

            {/* Submit */}
            <button
              type="button"
              className="mt-2 w-full rounded-full bg-[#6366F1] hover:bg-[#4F46E5] text-sm font-medium py-2.5 transition-colors"
            >
              Continue
            </button>
          </form>

          <p className="mt-4 text-[11px] text-slate-500">
            For this HNG stage, this page is only for UI demonstration. You can
            tell the judges that the real auth would be wired to Clerk/Convex.
          </p>
        </div>
      </div>
    </ConvexClientProvider>
  );
}
