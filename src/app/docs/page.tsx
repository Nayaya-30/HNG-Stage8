"use client";

import { useEffect, useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { useAuth } from "@/hooks/use-auth";
import { ConvexClientProvider } from "@/lib/convex/client";
import { cn } from "@/lib/utils";

type OnboardXStep = {
  id: string;
  title: string;
  body: string;
};

type OnboardXType = {
  init: (options: {
    steps: OnboardXStep[];
    onEvent?: (e: unknown) => void;
  }) => void;
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();

  /* -------------------------------
      ONBOARDX WIDGET (DOCS 5-STEP TOUR)
  -------------------------------- */
  useEffect(() => {
    // Only run in the browser and only when the user is logged in
    if (typeof window === "undefined") return;
    if (!isAuthenticated) return;

    const w = window as Window & typeof globalThis & {
      OnboardX?: OnboardXType;
    };

    // 1️⃣ Shim `process` so the widget bundle doesn't crash in the browser
    if (!(window as any).process) {
      (window as any).process = { env: { NODE_ENV: "production" } };
    } else if (!(window as any).process.env) {
      (window as any).process.env = { NODE_ENV: "production" };
    }

    // 2️⃣ Avoid loading the script more than once
    const existingScript = document.querySelector(
      "script[data-onboardx-widget]"
    );
    if (existingScript) {
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://onboardx-widget.vercel.app/onboardx-widget.iife.js";
    script.async = true;
    script.dataset.onboardxWidget = "true";

    script.onload = () => {
      if (!w.OnboardX) {
        console.error("OnboardX global not found after script load");
        return;
      }

      // 3️⃣ The EXACT same 5-step copy you showed in your screenshots
      const docsSteps: OnboardXStep[] = [
        {
          id: "workspace-welcome",
          title: "Welcome to your workspace",
          body:
            "This short 5-step tour will show you where everything lives so you can feel at home in seconds.",
        },
        {
          id: "navigation-main",
          title: "Navigation & main sections",
          body:
            "Use the left sidebar to move between your dashboard, tours, analytics and settings. Think of it as your product&apos;s main map.",
        },
        {
          id: "create-tours",
          title: "Create tours and see results",
          body:
            "The quick action cards help you add new tours, view performance and copy your embed code. Gold buttons are your primary actions.",
        },
        {
          id: "search-shortcuts",
          title: "Search, shortcuts & recent activity",
          body:
            "Use the search bar to jump straight to tours, products or customers, and use the cards below to review what&apos;s been happening recently.",
        },
        {
          id: "ready-to-explore",
          title: "You&apos;re ready to explore",
          body:
            "That&apos;s it for now. You can re-open this tour anytime from the glowing bubble in the corner if you need a quick refresher.",
        },
      ];

      w.OnboardX.init({
        steps: docsSteps,
        onEvent: (e: unknown) => {
          console.log("[OnboardX event]", e);
        },
      });
    };

    document.body.appendChild(script);

    // 4️⃣ Cleanup (not critical for your demo but nice to have)
    return () => {
      script.remove();
      const container = document.getElementById("onboardx-root");
      if (container) container.remove();
    };
  }, [isAuthenticated]);

  /* -------------------------------
              UI LAYOUT
  -------------------------------- */
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  {/* if (!isAuthenticated) {
  //   return (
  //     <div className="flex h-screen items-center justify-center text-white">
  //       Redirecting to login...
  //     </div>
  //   );
  */}

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
      </div>
    </ConvexClientProvider>
  );
}
