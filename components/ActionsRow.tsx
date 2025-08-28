"use client";

import { useState } from 'react';

export function ActionsRow({ userId, name }: { userId: string; name: string }) {
  const key = `${userId}/${name}`;
  const [busy, setBusy] = useState<string | null>(null);

  async function call(path: string, body: FormData) {
    setBusy(path);
    try {
      const res = await fetch(path, { method: 'POST', body });
      if (!res.ok) throw new Error(await res.text());
      location.reload();
    } catch (e) {
      console.error(e);
      alert('Action failed');
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        className="btn"
        disabled={!!busy}
        onClick={async () => {
          const fd = new FormData();
          fd.set('key', key);
          await call('/api/pdf/compress', fd);
        }}
      >{busy === '/api/pdf/compress' ? 'Compressing...' : 'Compress'}</button>

      <details className="border rounded-md px-2 py-1">
        <summary className="cursor-pointer text-sm">Split</summary>
        <div className="flex items-center gap-2 mt-2">
          <input className="input" style={{ width: 90 }} type="number" placeholder="Start" id={`s-${key}`} />
          <input className="input" style={{ width: 90 }} type="number" placeholder="End" id={`e-${key}`} />
          <button
            className="btn"
            disabled={!!busy}
            onClick={async () => {
              const start = Number((document.getElementById(`s-${key}`) as HTMLInputElement)?.value || '1');
              const end = Number((document.getElementById(`e-${key}`) as HTMLInputElement)?.value || String(start));
              const fd = new FormData();
              fd.set('key', key);
              fd.set('startPage', String(start));
              fd.set('endPage', String(end));
              await call('/api/pdf/split', fd);
            }}
          >Go</button>
        </div>
      </details>

      <details className="border rounded-md px-2 py-1">
        <summary className="cursor-pointer text-sm">Sign</summary>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <input className="input" type="number" placeholder="Page" id={`pi-${key}`} defaultValue={1} />
          <input className="input" type="file" accept="image/*" id={`sig-${key}`} />
          <input className="input" type="number" placeholder="X" id={`x-${key}`} defaultValue={50} />
          <input className="input" type="number" placeholder="Y" id={`y-${key}`} defaultValue={50} />
          <input className="input" type="number" placeholder="W" id={`w-${key}`} defaultValue={150} />
          <input className="input" type="number" placeholder="H" id={`h-${key}`} defaultValue={50} />
          <button
            className="btn col-span-2"
            disabled={!!busy}
            onClick={async () => {
              const fd = new FormData();
              fd.set('key', key);
              const pi = Number((document.getElementById(`pi-${key}`) as HTMLInputElement)?.value || '1') - 1;
              fd.set('pageIndex', String(Math.max(0, pi)));
              fd.set('x', (document.getElementById(`x-${key}`) as HTMLInputElement)?.value || '50');
              fd.set('y', (document.getElementById(`y-${key}`) as HTMLInputElement)?.value || '50');
              fd.set('width', (document.getElementById(`w-${key}`) as HTMLInputElement)?.value || '150');
              fd.set('height', (document.getElementById(`h-${key}`) as HTMLInputElement)?.value || '50');
              const fileInput = document.getElementById(`sig-${key}`) as HTMLInputElement;
              if (!fileInput.files || fileInput.files.length === 0) return alert('Select signature image');
              fd.set('signature', fileInput.files[0]);
              await call('/api/pdf/sign', fd);
            }}
          >Apply</button>
        </div>
      </details>
    </div>
  );
}

