'use client';

import { useState } from 'react';
// Assuming these are styled by Tailwind/shadcn and will inherit the dark theme context
import { Button } from '@/components/ui/button'; 
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const requestReset = useMutation(api.auth.requestPasswordReset);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    try {
      await requestReset({ email });
      setMessage('If an account exists, a reset link has been sent.');
    } catch {
      setMessage('Failed to request password reset. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // 1. Dark Background and subtle glow
    <div className="min-h-screen flex items-center justify-center bg-[#040816] relative p-4">
        {/* Glow element for premium feel, matching the Home page hero */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.1),_transparent_70%)]" />

      {/* 2. Card Styled for Dark Theme */}
      <Card 
        className="w-full max-w-md border border-slate-800 bg-slate-900/80 text-slate-50 rounded-3xl shadow-[0_24px_80px_rgba(15,23,42,0.9)] relative z-10 p-4"
      >
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold text-center text-slate-50">
            Reset Password
          </CardTitle>
          <CardDescription className="text-center text-slate-400 text-sm">
            Enter your email to receive a reset link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Message/Notification Style (Using Sky/Blue for informational message) */}
            {message && (
              <div className="p-3 text-sm text-sky-200 bg-sky-950/40 border border-sky-400/40 rounded-lg">
                {message}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200">Email</Label>
              {/* Input Style: Dark background, amber focus */}
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-amber-300 focus:ring-1 focus:ring-amber-300"
              />
            </div>

            {/* Primary Button Style (Amber) */}
            <Button 
                type="submit" 
                className="w-full bg-amber-300 text-slate-950 font-semibold hover:bg-amber-200 transition rounded-full" 
                disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </Button>

            <p className="text-center text-sm text-slate-400">
              Remembered your password?{' '}
              {/* Link Style (Sky/Blue accent) */}
              <Link 
                href="/auth/signin" 
                className="font-medium text-sky-400 hover:text-sky-300 transition"
              >
                Sign in
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
