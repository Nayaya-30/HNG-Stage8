"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-[#040816] flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-[0_24px_80px_rgba(15,23,42,1)]">
        <p className="text-xs tracking-[0.25em] uppercase text-slate-400 mb-3">
          Create account
        </p>
        <h1 className="text-xl font-semibold text-slate-50 mb-4">
          Join OnboardX
        </h1>
        <SignUp
          appearance={{
            variables: {
              colorPrimary: "#fbbf24",
              colorBackground: "#020617",
            },
          }}
        />
      </div>
    </main>
  );
}
