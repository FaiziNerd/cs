"use client";

import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/browserClient';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth/callback` } });
      if (error) throw error;
      setMessage('Check your email to confirm your account.');
    } catch (err: any) {
      setError(err.message ?? 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="card w-full max-w-md p-6">
        <h1 className="text-xl font-semibold mb-4">Sign up</h1>
        <form onSubmit={onSubmit} className="space-y-3">
          <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <p className="text-sm text-red-600">{error}</p>}
          {message && <p className="text-sm text-green-700">{message}</p>}
          <button className="btn w-full" disabled={loading} type="submit">{loading ? 'Creating...' : 'Create account'}</button>
        </form>
        <div className="flex items-center justify-between text-sm mt-4">
          <Link className="text-brand hover:underline" href="/login">Already have an account?</Link>
        </div>
      </div>
    </main>
  );
}

