import { createSupabaseServerClient } from '@/lib/supabase/serverClient';
import Link from 'next/link';
import { ActionsRow } from '@/components/ActionsRow';
import { MergeForm } from '@/components/MergeForm';

async function getData() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { user: null, files: [], history: [] };
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? '';
  const filesRes = await fetch(`${base}/api/files`, { cache: 'no-store' });
  const historyRes = await fetch(`${base}/api/history`, { cache: 'no-store' });
  const filesJson = await filesRes.json();
  const historyJson = await historyRes.json();
  return { user, files: filesJson.files ?? [], history: historyJson.history ?? [] };
}

export default async function DashboardPage() {
  const { user, files, history } = await getData();

  return (
    <main className="min-h-screen p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <form action="/auth/signout" method="post">
          <button className="btn" formAction="/auth/signout">Sign out</button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-4 space-y-3">
          <h2 className="font-medium">Upload PDF</h2>
          <form className="space-y-3" action="/api/upload" method="post" encType="multipart/form-data">
            <input className="input" type="file" name="file" accept="application/pdf" required />
            <button className="btn w-full" type="submit">Upload</button>
          </form>
        </div>

        <div className="card p-4 space-y-3 md:col-span-2">
          <h2 className="font-medium">Your Files</h2>
          <ul className="space-y-2 max-h-64 overflow-auto">
            {files.length === 0 && <li className="text-sm text-gray-500">No files yet.</li>}
            {files.map((f: any) => (
              <li key={f.name} className="flex items-center justify-between gap-2 border rounded-md p-2">
                <span className="truncate text-sm">{f.name}</span>
                <div className="flex items-center gap-2">
                  <ActionsRow userId={user.id} name={f.name} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <MergeForm userId={user?.id} files={files} />

      <div className="card p-4">
        <h2 className="font-medium mb-2">History</h2>
        <ul className="divide-y">
          {history.length === 0 && <li className="text-sm text-gray-500 p-2">No activity yet.</li>}
          {history.map((h: any) => (
            <li key={h.id} className="p-2 text-sm flex items-center justify-between">
              <span className="truncate">{h.action_type} - {h.file_key}</span>
              <span className="text-gray-500">{new Date(h.created_at).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

function getPublicUrl(key: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return `${url}/storage/v1/object/public/pdfs/${key}`;
}

function getKeyFromName(userId: string, name: string) {
  return `${userId}/${name}`;
}

function ClientActions({ fileName }: { fileName: string }) {
  return (
    <div className="flex items-center gap-2">
      <form action="/api/pdf/compress" method="post">
        <input type="hidden" name="key" value={fileName} />
        <button className="btn" formAction="/api/pdf/compress" formMethod="post">Compress</button>
      </form>
    </div>
  );
}

