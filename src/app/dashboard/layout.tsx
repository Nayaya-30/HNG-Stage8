"use client";

import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { useAuth } from "@/hooks/use-auth";
import { ConvexClientProvider } from "@/lib/convex/client";
import { cn } from "@/lib/utils";

type DemoStep = {
  id: string;
  title: string;
  body: string;
};

const DEMO_STEPS: DemoStep[] = [
  {
    id: "step-1",
    title: "Welcome to OnboardX",
    body: "This tour will show you the most important parts of your dashboard.",
  },
  {
    id: "step-2",
    title: "Overview & stats",
    body: "Track how many users started, progressed and completed your tours.",
  },
  {
    id: "step-3",
    title: "Manage tours",
    body: "Create, edit and organize product tours from the Tours tab.",
  },
  {
    id: "step-4",
    title: "Analytics",
    body: "See drop-offs, completion rate and performance for every step.",
  },
  {
    id: "step-5",
    title: "Embed in your app",
    body: "Copy the embed snippet from the Docs page to place OnboardX in any product.",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();

  /* -------------------------------
      AUTH LOADING + REDIRECT STATES
  -------------------------------- */
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        Redirecting to login...
      </div>
    );
  }

  /* -------------------------------
                UI LAYOUT
  -------------------------------- */
  return (
    <ConvexClientProvider>
      <div
        className={cn(
          "flex min-h-screen bg-brand-navy text-white",
          sidebarOpen && "overflow-hidden"
        )}
      >
        {/* SIDEBAR */}
        <DashboardSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* MOBILE OVERLAY */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* MAIN CONTENT AREA */}
        <div className="flex flex-1 flex-col">
          {/* HEADER */}
          <DashboardHeader
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          {/* MAIN BODY */}
          <main
            className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-10 
            bg-gradient-to-br from-brand-navy via-[#0A1128]/80 to-[#0A1128]"
          >
            <div className="max-w-7xl mx-auto space-y-8">{children}</div>
          </main>
        </div>

        {/* --------------------------------------------------
            O N B O A R D X   B U B B L E   +   T O U R   C A R D
           -------------------------------------------------- */}
        {/* Floating bubble */}
        <button
          type="button"
          onClick={() => setTourOpen((prev) => !prev)}
          className="fixed bottom-8 right-8 z-[999999] h-14 w-14 rounded-full 
                     bg-gradient-to-br from-amber-300 via-sky-400 to-indigo-500
                     shadow-xl flex items-center justify-center text-2xl"
        >
          ✨
        </button>

        {/* Tour panel */}
        {tourOpen && (
          <div
            className="fixed bottom-28 right-8 z-[999999] w-[320px] 
                       rounded-2xl bg-slate-900 text-slate-50 shadow-2xl 
                       border border-slate-700 p-4"
          >
            <p className="text-[11px] uppercase tracking-[0.2em] text-amber-300">
              OnboardX tour
            </p>
            <h2 className="mt-1 text-sm font-semibold">
              Quick tour of your dashboard
            </h2>
            <p className="mt-1 text-xs text-slate-300">
              Here’s how to use OnboardX to create, track and embed tours.
            </p>

            <ol className="mt-3 space-y-2 text-xs text-slate-100">
              {DEMO_STEPS.map((step, index) => (
                <li
                  key={step.id}
                  className="flex gap-2 rounded-lg bg-slate-800/60 px-3 py-2"
                >
                  <span className="mt-[2px] inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-300/20 text-[11px] text-amber-300">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium">{step.title}</p>
                    <p className="text-[11px] text-slate-300">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <button
              type="button"
              onClick={() => setTourOpen(false)}
              className="mt-3 w-full rounded-full bg-amber-300 px-3 py-1.5 text-[11px] 
                         font-semibold text-black hover:bg-amber-200"
            >
              Got it
            </button>
          </div>
        )}
      </div>
    </ConvexClientProvider>
  );
}
