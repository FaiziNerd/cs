"use client";

import { useEffect, useState, FormEvent } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/browserClient';
import { useRouter } from 'next/navigation';

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const supabase = createSupabaseBrowserClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
    })();
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      router.replace('/login');
    } catch (err: any) {
      setError(err.message ?? 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="card w-full max-w-md p-6">
        <h1 className="text-xl font-semibold mb-4">Set new password</h1>
        <form onSubmit={onSubmit} className="space-y-3">
          <input className="input" type="password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button className="btn w-full" disabled={loading} type="submit">{loading ? 'Updating...' : 'Update password'}</button>
        </form>
      </div>
    </main>
  );
}

