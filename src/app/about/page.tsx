"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

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

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#040816] text-slate-50 px-6 md:px-10 lg:px-16 py-16">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* HERO / INTRO */}
        <section>
          <motion.div
            className="grid gap-10 md:grid-cols-[1.4fr,1fr] items-center"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="space-y-4">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-slate-400">
                About OnboardX
              </p>
              <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
                We help teams turn{" "}
                <span className="text-amber-300">confusing dashboards</span>{" "}
                into guided experiences users actually understand.
              </h1>
              <p className="text-sm md:text-base text-slate-300 max-w-xl leading-relaxed">
                OnboardX was designed as more than just a Stage 8 assignment.
                It&apos;s a complete product concept: marketing site, dashboard,
                and embeddable widget — all working together to deliver clean,
                modern onboarding for SaaS products.
              </p>
              <div className="flex flex-wrap gap-3 text-[11px] text-slate-400">
                <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Built with Next.js, Convex & Clerk
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 px-3 py-1">
                  ✨ Focused on real product UX
                </span>
              </div>
            </motion.div>

            {/* Right visual */}
            <motion.div
              variants={fadeUp}
              className="relative flex justify-center md:justify-end"
            >
              <div className="pointer-events-none absolute -inset-8 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(251,191,36,0.24),_transparent_60%)]" />
              <div className="relative rounded-3xl border border-slate-800 bg-slate-900/70 p-4 shadow-[0_30px_90px_rgba(15,23,42,1)] backdrop-blur">
                <div className="flex items-center justify-between mb-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Live tour preview
                  </span>
                  <span className="rounded-full bg-slate-800/80 px-2 py-0.5">
                    OnboardX • v1.0
                  </span>
                </div>
                <Image
                  src="/tour.png"
                  alt="OnboardX guided tour preview"
                  width={520}
                  height={320}
                  className="rounded-2xl object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* STATS / HIGHLIGHTS */}
        <section>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-4 md:grid-cols-3"
          >
            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-1"
            >
              <p className="text-xs text-slate-400 uppercase tracking-[0.23em]">
                Focus
              </p>
              <p className="text-xl font-semibold text-amber-300">
                Guided product tours
              </p>
              <p className="text-xs text-slate-400">
                Designed for onboarding flows with at least 5 steps, unique IDs
                and analytics baked in.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-1"
            >
              <p className="text-xs text-slate-400 uppercase tracking-[0.23em]">
                Tech stack
              </p>
              <p className="text-xl font-semibold text-sky-400">
                Next.js + Convex + Clerk
              </p>
              <p className="text-xs text-slate-400">
                Modern, scalable stack with serverless backend, auth and a
                separate Vite-powered widget.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-1"
            >
              <p className="text-xs text-slate-400 uppercase tracking-[0.23em]">
                Experience
              </p>
              <p className="text-xl font-semibold text-emerald-400">
                Built for real users
              </p>
              <p className="text-xs text-slate-400">
                Not just pretty UI – every screen is tied back to a clear
                onboarding and analytics workflow.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* STORY + VALUES */}
        <section className="grid gap-10 md:grid-cols-[1.4fr,1fr] items-start">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-5"
          >
            <motion.div variants={fadeUp} className="space-y-3">
              <h2 className="text-2xl md:text-3xl font-semibold">
                Why OnboardX exists
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Most dashboards drop users into a blank screen with tiny hints
                and overloaded navigation. OnboardX was created to fix that —
                by giving teams a way to design tours that actually feel like a
                conversation, not a checklist.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                The project combines three perspectives: marketing, product
                experience and engineering. The external pages sell the story,
                the dashboard manages tours, and the widget actually guides the
                user inside any app.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-3">
              <p className="text-xs font-semibold tracking-[0.25em] text-slate-400 uppercase">
                Product principles
              </p>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-300" />
                  <div>
                    <p className="font-semibold text-slate-100">
                      Clarity over noise
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Every screen, copy block and animation is designed to
                      reduce confusion, not add more UI for the sake of it.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />
                  <div>
                    <p className="font-semibold text-slate-100">
                      Fast feedback loops
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Tours are connected to analytics so teams can see what
                      users finish, skip or abandon — then iterate quickly.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <div>
                    <p className="font-semibold text-slate-100">
                      Real-world ready
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      The structure mirrors how actual SaaS onboarding products
                      work: marketing → dashboard → embeddable widget.
                    </p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* “Team” / creator block */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-[0_26px_80px_rgba(15,23,42,1)] space-y-4"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-950/70 border border-slate-700 px-3 py-1 text-[11px] text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Built by a small focused team
            </div>

            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 rounded-full overflow-hidden border border-amber-300/60 bg-slate-900">
                <Image
                  src="/human.png"
                  alt="OnboardX team"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold">OnboardX Team</p>
                <p className="text-xs text-slate-400">
                  Frontend • Product UX • Widget integration
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              OnboardX is part of the HNG Stage 8 ecosystem — but it&apos;s
              structured like a real product you could keep growing after the
              internship: plug in more tours, deeper analytics, richer demos.
            </p>

            <div className="flex flex-wrap gap-2 text-[11px]">
              <span className="rounded-full bg-slate-950/70 border border-slate-700 px-3 py-1">
                Next.js App Router
              </span>
              <span className="rounded-full bg-slate-950/70 border border-slate-700 px-3 py-1">
                Convex backend
              </span>
              <span className="rounded-full bg-slate-950/70 border border-slate-700 px-3 py-1">
                Clerk authentication
              </span>
            </div>
          </motion.div>
        </section>

        {/* HOW IT CONNECTS TO THE REST OF THE APP */}
        <section className="space-y-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="space-y-3"
          >
            <p className="text-xs font-semibold tracking-[0.25em] text-slate-400 uppercase">
              Product ecosystem
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold">
              One product, three connected experiences.
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl">
              OnboardX isn&apos;t just a single page. It&apos;s structured as a
              real SaaS onboarding platform with a clear separation of
              responsibilities across the stack.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="grid gap-4 md:grid-cols-3"
          >
            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
            >
              <p className="text-xs font-semibold text-amber-300 mb-1">
                01 • External pages
              </p>
              <p className="text-sm font-semibold mb-2">
                Marketing & documentation
              </p>
              <p className="text-xs text-slate-400">
                Landing page, About page and Docs explain the product, show how
                to embed the widget and invite users to sign in.
              </p>
              <Link
                href="/"
                className="inline-flex mt-3 text-[11px] text-amber-300 hover:text-amber-200"
              >
                View landing page →
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
            >
              <p className="text-xs font-semibold text-sky-400 mb-1">
                02 • Dashboard
              </p>
              <p className="text-sm font-semibold mb-2">
                Tour management & analytics
              </p>
              <p className="text-xs text-slate-400">
                A logged-in area where teams create tours, define steps, and see
                completion or drop-off using Convex + Clerk.
              </p>
              <span className="inline-flex mt-3 text-[11px] text-slate-500">
                (Dashboard implementation lives in the main app.)
              </span>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
            >
              <p className="text-xs font-semibold text-emerald-400 mb-1">
                03 • Embeddable widget
              </p>
              <p className="text-sm font-semibold mb-2">
                The actual in-app experience
              </p>
              <p className="text-xs text-slate-400">
                A Vite-powered tour bubble that can be dropped into any product
                with a script tag, guiding users step by step.
              </p>
              <span className="inline-flex mt-3 text-[11px] text-slate-500">
                (Widget runs in a separate repo/bundle.)
              </span>
            </motion.div>
          </motion.div>
        </section>

        {/* FINAL CTA */}
        <section className="mt-4 mb-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 px-6 py-8 md:px-10 md:py-10 shadow-[0_24px_80px_rgba(15,23,42,1)]"
          >
            <div className="pointer-events-none absolute inset-y-0 -right-10 w-64 bg-[radial-gradient(circle_at_center,_rgba(251,191,36,0.25),_transparent_70%)]" />
            <div className="space-y-4 max-w-xl relative">
              <p className="text-xs tracking-[0.25em] uppercase text-slate-400 font-semibold">
                Ready to explore OnboardX?
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold">
                See how a real onboarding product can start from an internship
                brief.
              </h2>
              <p className="text-sm text-slate-300">
                Sign in, create a tour and connect your own widget, or simply
                use this project as a case study for how you approach UX and
                frontend engineering.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/sign-up">
                  <button className="rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-amber-200 transition">
                    Get started free
                  </button>
                </Link>
                <Link href="/docs">
                  <button className="rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-slate-300 transition">
                    Read installation docs
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
