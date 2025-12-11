"use client";

import Script from "next/script";

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

const WIDGET_URL = process.env.NEXT_PUBLIC_ONBOARDX_WIDGET_URL!;

// ✅ EXACTLY the same text as your docs 5-step tour
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
      "Use the left sidebar to move between your dashboard, tours, analytics and settings. Think of it as your product’s main map.",
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
      "Use the search bar to jump straight to tours, products or customers, and use the cards below to review what’s been happening recently.",
  },
  {
    id: "ready-to-explore",
    title: "You’re ready to explore",
    body:
      "That’s it for now. You can re-open this tour anytime from the glowing bubble in the corner if you need a quick refresher.",
  },
];

export function OnboardXBubble() {
  return (
    <>
      {/* 1️⃣ Create a global `process` BEFORE the widget script runs */}
      <Script
        id="onboardx-process-shim"
        strategy="afterInteractive"
      >{`
        // Make sure global process exists for the widget bundle
        window.process = window.process || {};
        window.process.env = window.process.env || {};
        window.process.env.NODE_ENV = window.process.env.NODE_ENV || 'production';
        // Also create the global var \`process\` so "process.env" works
        var process = window.process;
      `}
      </Script>

      {/* 2️⃣ Load the widget script from your env URL */}
      <Script
        id="onboardx-widget"
        src={WIDGET_URL}
        strategy="afterInteractive"
        onLoad={() => {
          const w = window as typeof window & { OnboardX?: OnboardXType };

          if (!w.OnboardX) {
            console.error("OnboardX global not found after script load");
            return;
          }

          // 3️⃣ Initialize with the same 5 docs steps
          w.OnboardX.init({
            steps: docsSteps,
            onEvent: (e) => {
              console.log("[OnboardX event]", e);
            },
          });
        }}
      />
    </>
  );
}
