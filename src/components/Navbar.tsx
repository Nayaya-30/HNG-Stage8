"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "/about", label: "About" },
	{ href: "/docs", label: "Docs" },
	{ href: "/contact", label: "Contact" },
];

export default function Navbar() {
	const pathname = usePathname();
	const isDashboard = pathname?.startsWith("/dashboard");
	if (isDashboard) return null;

	return (
		<header className="border-b border-white/5 bg-[#020617]/80 backdrop-blur-md">
			<div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
				{/* Logo */}
				<Link href="/" className="flex items-center gap-3">
					<div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 via-sky-400 to-indigo-500 shadow-[0_0_30px_rgba(56,189,248,0.7)] text-xs font-semibold text-slate-950">
						XO
					</div>
					<div className="flex flex-col leading-tight">
						<span className="text-sm font-semibold text-slate-50">
							OnboardX
						</span>
						<span className="text-[11px] text-slate-400">
							Guided tours for dashboards
						</span>
					</div>
				</Link>

				{/* Nav links */}
				<nav className="hidden gap-6 text-sm text-slate-300 md:flex">
					{navLinks.map((link) => {
						const active = pathname === link.href;
						return (
							<Link
								key={link.href}
								href={link.href}
								className={`transition hover:text-white ${active
									? "text-white after:block after:h-[2px] after:w-full after:bg-amber-300 after:mt-1"
									: ""
									}`}
							>
								{link.label}
							</Link>
						);
					})}
				</nav>

				{/* Right side auth actions */}
				<div className="flex items-center gap-3">
					{/* When user is NOT signed in */}
					<SignedOut>
						<Link
							href="/auth/signin"
							className="hidden rounded-full border border-slate-600 px-4 py-1.5 text-sm text-slate-100 hover:border-slate-300 md:inline-flex"
						>
							Sign in
						</Link>
						<Link
							href="/auth/signup"
							className="rounded-full bg-amber-300 px-4 py-1.5 text-sm font-semibold text-slate-950 shadow-[0_10px_35px_rgba(250,204,21,0.45)] hover:bg-amber-200"
						>
							Get started
						</Link>
					</SignedOut>

					{/* When user IS signed in */}
					<SignedIn>
						<Link
							href="/dashboard"
							className="hidden rounded-full border border-slate-600 px-4 py-1.5 text-sm text-slate-100 hover:border-slate-300 md:inline-flex"
						>
							Dashboard
						</Link>
						<UserButton
							afterSignOutUrl="/"
							appearance={{
								elements: {
									avatarBox:
										"h-8 w-8 border border-amber-300/60 shadow-[0_0_20px_rgba(250,204,21,0.5)]",
								},
							}}
						/>
					</SignedIn>
				</div>
			</div>
		</header>
	);
}
