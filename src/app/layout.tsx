import { ClerkProvider } from "@clerk/nextjs";

import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import type { Metadata } from "next";
import "./globals.css";
// import Navbar from "@/components/Navbar";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});



export const metadata: Metadata = {
  title: "OnboardX",
  description: "Bright, guided onboarding tours for modern web apps.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
       <ClerkProvider>
      <body className="min-h-screen bg-brand-navy text-slate-100 font-[var(--font-inter)]">
        {/* <Navbar /> */}
        <main className="mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl flex-col px-4 py-10">
          {children}
        </main>
      </body>
      </ClerkProvider>
    </html>
  );
}
