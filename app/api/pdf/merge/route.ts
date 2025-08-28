import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/serverClient';
import { PDFDocument } from 'pdf-lib';
import { PDF_BUCKET } from '@/lib/constants';
import { logAction } from '@/lib/log';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const contentType = req.headers.get('content-type') || '';
  let keys: string[] = [];
  if (contentType.includes('application/json')) {
    const body = await req.json();
    keys = Array.isArray(body.keys) ? body.keys : [];
  } else {
    const form = await req.formData();
    const formKeys = form.getAll('keys');
    keys = formKeys.map((k) => String(k));
  }
  if (!Array.isArray(keys) || keys.length < 2) return NextResponse.json({ error: 'Provide at least two keys' }, { status: 400 });

  const merged = await PDFDocument.create();
  for (const key of keys) {
    const { data, error } = await supabase.storage.from(PDF_BUCKET).download(key);
    if (error || !data) return NextResponse.json({ error: error?.message ?? `Failed to get ${key}` }, { status: 400 });
    const src = await PDFDocument.load(await data.arrayBuffer());
    const pages = await merged.copyPages(src, src.getPageIndices());
    for (const p of pages) merged.addPage(p);
  }
  const bytes = await merged.save({ useObjectStreams: true });

  const outKey = `${user.id}/merged.${Date.now()}.pdf`;
  const { error: upErr } = await supabase.storage.from(PDF_BUCKET).upload(outKey, bytes, { contentType: 'application/pdf' });
  if (upErr) return NextResponse.json({ error: upErr.message }, { status: 400 });

  await logAction({ userId: user.id, fileKey: outKey, actionType: 'merge', details: { sources: keys } });
  return NextResponse.json({ ok: true, key: outKey });
}

