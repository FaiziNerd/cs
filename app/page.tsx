import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-6">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold">SaaS PDF Tools</h1>
          <p className="text-gray-600">Compress, merge, split and sign PDFs. Securely powered by Supabase.</p>
        </div>
        <div className="card p-6 space-y-4 text-center">
          <p>Get started by creating an account or logging in.</p>
          <div className="flex items-center justify-center gap-3">
            <Link className="btn" href="/login">Log in</Link>
            <Link className="btn" href="/signup">Sign up</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

