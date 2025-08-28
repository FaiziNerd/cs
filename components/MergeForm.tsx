"use client";

import { useState } from 'react';

export function MergeForm({ userId, files }: { userId: string; files: { name: string }[] }) {
  const [busy, setBusy] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  async function submit() {
    if (selected.length < 2) return alert('Select at least two files');
    setBusy(true);
    try {
      const fd = new FormData();
      for (const n of selected) fd.append('keys', `${userId}/${n}`);
      const res = await fetch('/api/pdf/merge', { method: 'POST', body: fd });
      if (!res.ok) throw new Error(await res.text());
      location.reload();
    } catch (e) {
      console.error(e);
      alert('Merge failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card p-4 space-y-3">
      <h2 className="font-medium">Merge PDFs</h2>
      <select
        multiple
        className="input h-40"
        value={selected}
        onChange={(e) => {
          const options = Array.from(e.target.options);
          setSelected(options.filter((o) => o.selected).map((o) => o.value));
        }}
      >
        {files.map((f) => (
          <option key={f.name} value={f.name}>{f.name}</option>
        ))}
      </select>
      <button className="btn" disabled={busy} onClick={submit}>{busy ? 'Merging...' : 'Merge Selected'}</button>
    </div>
  );
}

