"use client";

import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/browserClient';

export default function ResetPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset/update`
      });
      if (error) throw error;
      setMessage('Check your email for a reset link.');
    } catch (err: any) {
      setError(err.message ?? 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="card w-full max-w-md p-6">
        <h1 className="text-xl font-semibold mb-4">Reset password</h1>
        <form onSubmit={onSubmit} className="space-y-3">
          <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          {error && <p className="text-sm text-red-600">{error}</p>}
          {message && <p className="text-sm text-green-700">{message}</p>}
          <button className="btn w-full" disabled={loading} type="submit">{loading ? 'Sending...' : 'Send reset link'}</button>
        </form>
        <div className="flex items-center justify-between text-sm mt-4">
          <Link className="text-brand hover:underline" href="/login">Back to login</Link>
        </div>
      </div>
    </main>
  );
}

