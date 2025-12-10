// src/components/SplashScreen.tsx
export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy">
      {/* Glow background */}
      <div className="absolute -inset-24 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.25),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.3),_transparent_60%)]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/15 bg-white/5 shadow-xl">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-brand-gold via-brand-blue to-brand-royal animate-pulse" />
        </div>

        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          OnboardX
        </p>

        <h1 className="text-center text-xl md:text-2xl font-semibold text-white">
          Bright product tours{" "}
          <span className="text-brand-gold">for humans</span>
        </h1>

        {/* Small loading bar */}
        <div className="mt-3 h-1 w-32 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 rounded-full bg-brand-gold animate-[loadingBar_1.6s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
