"use client";

import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/browserClient';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const search = useSearchParams();
  const redirect = search.get('redirect') || '/dashboard';

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.replace(redirect);
    } catch (err: any) {
      setError(err.message ?? 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="card w-full max-w-md p-6">
        <h1 className="text-xl font-semibold mb-4">Log in</h1>
        <form onSubmit={onSubmit} className="space-y-3">
          <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button className="btn w-full" disabled={loading} type="submit">{loading ? 'Signing in...' : 'Sign in'}</button>
        </form>
        <div className="flex items-center justify-between text-sm mt-4">
          <Link className="text-brand hover:underline" href="/signup">Create account</Link>
          <Link className="text-brand hover:underline" href="/reset">Forgot password?</Link>
        </div>
      </div>
    </main>
  );
}

