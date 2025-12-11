"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2200); // ~2.2s
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-[#040816] text-slate-50 relative">
      {/* INTRO / SPLASH OVERLAY */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#040816]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center space-y-3"
            >
              <p className="text-xs tracking-[0.3em] uppercase text-slate-400">
                OnboardX
              </p>
              <p className="text-2xl md:text-3xl font-semibold">
                Onboard users. No confusion.
              </p>
              <p className="text-[11px] text-slate-500">
                loading your tour experience…
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page padding wrapper */}
      <div className="px-6 md:px-10 lg:px-16 pb-20">
        {/* HERO */}
        <section className="pt-24 md:pt-28 max-w-6xl mx-auto">
          <motion.div
            className="grid gap-12 md:gap-16 md:grid-cols-2 items-center"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {/* LEFT */}
            <motion.div variants={fadeUp} className="space-y-7">
              <p className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-[11px] tracking-[0.22em] uppercase text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                New • Guided onboarding for modern apps
              </p>

              <h1 className="text-4xl md:text-5xl lg:text-[3.1rem] font-semibold leading-tight">
                Turn confused users into{" "}
                <span className="text-amber-300">confident power users</span>{" "}
                in minutes.
              </h1>

              <p className="text-sm md:text-base text-slate-300 max-w-md leading-relaxed">
                OnboardX lets you create beautiful multi-step product tours,
                track completion and drop-off, and embed them into any
                dashboard with a single script snippet.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link href="/docs#demo">
                  <button className="rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_12px_40px_rgba(251,191,36,0.4)] hover:bg-amber-200 transition">
                    Try live demo
                  </button>
                </Link>

                <Link href="/docs">
                  <button className="rounded-full border border-slate-700/90 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-slate-300 hover:text-slate-50 transition">
                    View embed docs
                  </button>
                </Link>
              </div>

              <p className="text-[11px] text-slate-500 flex flex-wrap gap-3">
                <span>• No code changes required</span>
                <span>• Works with any frontend</span>
                <span>• Built for HNG Stage 8</span>
              </p>
            </motion.div>

            {/* RIGHT – hero image */}
            <motion.div
              variants={fadeUp}
              className="relative flex justify-center md:justify-end"
            >
              {/* Glow background */}
              <div className="pointer-events-none absolute -inset-10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.15),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(251,191,36,0.2),_transparent_60%)]" />

              <div className="relative rounded-3xl border border-slate-800/80 bg-slate-900/60 p-3 shadow-[0_24px_80px_rgba(15,23,42,0.9)] backdrop-blur">
                <Image
                  src="/human.png"
                  alt="OnboardX dashboard preview"
                  width={620}
                  height={420}
                  priority
                  className="rounded-2xl"
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* FEATURES */}
        <section className="mt-24 max-w-6xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-10"
          >
            <motion.div variants={fadeUp} className="space-y-3">
              <p className="text-xs font-semibold tracking-[0.25em] text-slate-400 uppercase">
                Features
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold">
                Everything you need to ship better onboarding.
              </h2>
              <p className="text-sm text-slate-400 max-w-2xl">
                From first-run tours to feature announcements, OnboardX gives
                product teams a fast, flexible way to guide users without
                shipping new releases every time.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="grid gap-6 md:grid-cols-3"
            >
              {/* Card 1 */}
              <div className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.9)] hover:border-amber-300/60 hover:shadow-[0_0_50px_rgba(251,191,36,0.35)] transition">
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber-300/10 text-amber-300 text-sm">
                  1
                </div>
                <h3 className="text-sm font-semibold mb-2">
                  Build multi-step tours in minutes
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Create guided flows with at least 5 steps, unique IDs and
                  rich copy. No need to ping engineering for every little
                  change.
                </p>
              </div>

              {/* Card 2 */}
              <div className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.9)] hover:border-sky-400/60 hover:shadow-[0_0_50px_rgba(56,189,248,0.35)] transition">
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-400/10 text-sky-400 text-sm">
                  2
                </div>
                <h3 className="text-sm font-semibold mb-2">
                  See who finishes, skips or drops off
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Track key events like{" "}
                  <span className="font-mono text-[11px]">
                    tour_started
                  </span>{" "}
                  and{" "}
                  <span className="font-mono text-[11px]">
                    step_completed
                  </span>{" "}
                  so you always know how users are engaging.
                </p>
              </div>

              {/* Card 3 */}
              <div className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.9)] hover:border-emerald-400/60 hover:shadow-[0_0_50px_rgba(52,211,153,0.35)] transition">
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-400 text-sm">
                  3
                </div>
                <h3 className="text-sm font-semibold mb-2">
                  Embed anywhere with one script
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Drop the OnboardX snippet into any dashboard or marketing site
                  and your tours are live — React, Next.js, Vue or plain HTML.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mt-24 max-w-6xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-10 md:grid-cols-[1.1fr,1fr] items-start"
          >
            <motion.div variants={fadeUp} className="space-y-4">
              <p className="text-xs font-semibold tracking-[0.25em] text-slate-400 uppercase">
                How it works
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold">
                From idea to live tour in three simple steps.
              </h2>
              <p className="text-sm text-slate-400 max-w-xl">
                Ship your first onboarding tour without touching your core code
                base. OnboardX plugs into your existing stack and keeps
                everything in one place.
              </p>

              <ol className="mt-4 space-y-4 text-sm">
                <li className="flex gap-4">
                  <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber-300 text-[11px] font-semibold text-slate-950">
                    1
                  </span>
                  <div>
                    <p className="font-semibold">Create a tour in the dashboard</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Use our dashboard (with Convex + Clerk) to define your
                      tour, steps, copy and targeting rules.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-sky-400 text-[11px] font-semibold text-slate-950">
                    2
                  </span>
                  <div>
                    <p className="font-semibold">Drop the embed snippet</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Paste the script tag from the docs into your app. OnboardX
                      automatically boots the widget for logged-in users.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400 text-[11px] font-semibold text-slate-950">
                    3
                  </span>
                  <div>
                    <p className="font-semibold">Watch users complete the tour</p>
                    <p className="text-xs text-slate-400 mt-1">
                      See completion rates, skipped steps and drop-off — then
                      iterate quickly without shipping a new release.
                    </p>
                  </div>
                </li>
              </ol>
            </motion.div>

            {/* Code snippet */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-[0_22px_70px_rgba(15,23,42,0.95)]"
            >
              <p className="text-xs font-semibold text-slate-300 mb-3">
                Simple embed snippet
              </p>
              <div className="rounded-xl bg-[#020617] border border-slate-800/80 p-4 text-[11px] font-mono text-slate-300 overflow-x-auto">
                <p className="text-slate-500 mb-2">Add this in the head of your script before the &lt;body&gt;</p>
                <pre className="whitespace-pre">
{`<script src="https://your-widget-url.vercel.app/onboardx.js" async></script>
<script>
  window.OnboardX?.init({
    tourId: "welcome-tour",
    userId: "current-user-id",
  });
</script>`}
                </pre>
              </div>
              <p className="mt-3 text-[11px] text-slate-500">
                The actual widget runs in a separate Vite bundle. This page
                simply documents how teams can embed it.
              </p>

              <Link href="/docs">
                <button className="mt-4 rounded-full border border-slate-700 px-4 py-2 text-[11px] font-semibold text-slate-200 hover:border-slate-300">
                  Read full documentation →
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* FINAL CTA */}
        <section className="mt-28 max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 px-6 py-8 md:px-10 md:py-10 shadow-[0_24px_80px_rgba(15,23,42,1)]"
          >
            <div className="pointer-events-none absolute inset-y-0 -right-10 w-52 bg-[radial-gradient(circle_at_center,_rgba(251,191,36,0.25),_transparent_70%)]" />
            <div className="space-y-4 max-w-md relative">
              <p className="text-xs tracking-[0.25em] uppercase text-slate-400 font-semibold">
                Ready to ship your first tour?
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold">
                Turn your Stage 8 project into a real onboarding product.
              </h2>
              <p className="text-sm text-slate-300">
                Sign in, create a tour and copy the embed snippet. You&apos;ll
                have a fully working onboarding experience in less than an
                afternoon.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/sign-up">
                  <button className="rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-amber-200 transition">
                    Get started free
                  </button>
                </Link>
                <Link href="/sign-in">
                  <button className="rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-slate-300 transition">
                    Sign in to dashboard
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="mt-16 max-w-6xl mx-auto border-t border-slate-800 pt-6 text-[11px] text-slate-500 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} OnboardX. Built for HNG Stage 8.</p>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-slate-300">
              About
            </Link>
            <Link href="/docs" className="hover:text-slate-300">
              Docs
            </Link>
            <Link href="/contact" className="hover:text-slate-300">
              Contact
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
