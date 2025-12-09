"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-6">
      <div className="space-y-2 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-gold">
          Authentication
        </p>
        <h1 className="text-3xl font-semibold text-white">Create account</h1>
        <p className="text-sm text-slate-300">
          Use the form below to create your OnboardX account.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <SignUp
          appearance={{
            elements: {
              card: "bg-transparent shadow-none border-0",
              headerTitle: "text-white",
              headerSubtitle: "text-slate-300",
              formButtonPrimary:
                "bg-brand-gold text-brand-navy hover:bg-yellow-400",
            },
          }}
        />
      </div>
    </div>
  );
}
