import React from "react";

export default function ContactPage() {
  return (
    <div className="max-w-2xl  bg-black/1 space-y-6">
      <div className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-gold">
          Contact
        </p>
        <h1 className="text-3xl font-semibold text-white">
          Let&apos;s talk about your onboarding.
        </h1>
        <p className="text-sm text-slate-300">
          This is a simple placeholder form. For now it doesn&apos;t submit
          anywhere, but it makes your external pages look complete and
          professional.
        </p>
      </div>

      <form className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-200">
              First name
            </label>
            <input
              type="text"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-gold outline-none"
              placeholder="Ada"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-200">
              Last name
            </label>
            <input
              type="text"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-gold outline-none"
              placeholder="Lovelace"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-200">
            Work email
          </label>
          <input
            type="email"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-gold outline-none"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-200">
            Message
          </label>
          <textarea
            rows={4}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-gold outline-none"
            placeholder="Tell us about your product and how you’d like to use guided tours."
          />
        </div>

        <button
          type="button"
          className="rounded-full bg-brand-gold px-6 py-2.5 text-sm font-medium text-brand-navy shadow-lg hover:bg-yellow-400"
        >
          Send message (placeholder)
        </button>

        <p className="text-[11px] text-slate-500">
          This form is for demo only. In a real app, you&apos;d connect it to
          your backend or a tool like Formspree.
        </p>
      </form>
    </div>
  );
}
