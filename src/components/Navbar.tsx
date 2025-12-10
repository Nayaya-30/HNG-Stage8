// src/components/Navbar.tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-white/10 bg-brand-navy/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-gold via-brand-blue to-brand-royal" />
          <span className="text-lg font-semibold tracking-tight text-white">
            Onboard<span className="text-brand-gold">X</span>
          </span>
        </Link>

        {/* CENTER LINKS (desktop) */}
        <div className="hidden items-center gap-6 text-sm text-slate-200 md:flex">
          <Link href="/about" className="hover:text-brand-gold">
            About
          </Link>
          <Link href="/docs" className="hover:text-brand-gold">
            Docs
          </Link>
          <Link href="/contact" className="hover:text-brand-gold">
            Contact
          </Link>
        </div>

        {/* AUTH BUTTONS */}
        <div className="flex items-center gap-3 text-sm">
          <Link
            href="/sign-in"
            className="text-slate-200 hover:text-brand-gold"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="rounded-full bg-brand-gold px-4 py-2 font-medium text-brand-navy shadow-lg hover:bg-yellow-400"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
}
