"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-slate-950/80 px-6 py-8 shadow-[0_30px_120px_rgba(15,23,42,1)] backdrop-blur-md">
        {/* soft glow */}
        <div className="pointer-events-none absolute -inset-10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(251,191,36,0.2),_transparent_65%)]" />
        <div className="relative">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Welcome back
          </p>
          <h1 className="mt-1 text-xl md:text-2xl font-semibold text-slate-50">
            Sign in to OnboardX
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Use the account you created for the HNG Stage&nbsp;8 dashboard.
          </p>

          <div className="mt-6 flex justify-center">
            <SignIn
              appearance={{
                elements: {
                  card: "bg-slate-950/80 border border-slate-800 shadow-none",
                  headerTitle: "text-slate-50",
                  headerSubtitle: "text-slate-400",
                  footerActionText: "text-slate-400",
                  formFieldLabel: "text-slate-200",
                  formFieldInput:
                    "bg-slate-900/70 border-slate-700 text-slate-50",
                  formButtonPrimary:
                    "bg-amber-300 text-slate-950 hover:bg-amber-200",
                },
              }}
              redirectUrl="/"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
