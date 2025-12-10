import React from "react";

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-white">
        About OnboardX
      </h1>

      <p className="max-w-2xl text-sm text-slate-300">
        OnboardX is a guided onboarding platform built for the HNG Stage 8
        project. It allows developers to create interactive multi-step tours
        that help new users understand their product faster.
      </p>

      <p className="max-w-2xl text-sm text-slate-300">
        This page is currently a placeholder. Later, you can update this text to
        match your final product direction, team details, and the purpose behind
        your onboarding tool.
      </p>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 max-w-2xl">
        <h2 className="text-xl font-semibold text-brand-gold mb-3">
          What this project includes:
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-sm text-slate-300">
          <li>Animated marketing landing page</li>
          <li>Documentation for embedding the widget</li>
          <li>Dashboard for managing tours and steps</li>
          <li>Embeddable onboarding widget</li>
          <li>Authentication using Clerk, Supabase, or Firebase</li>
        </ul>
      </div>
    </div>
  );
}
