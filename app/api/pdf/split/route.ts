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
  let key: string | null = null;
  let startPage: number | null = null;
  let endPage: number | null = null;
  if (contentType.includes('application/json')) {
    const body = await req.json();
    key = body.key;
    startPage = Number(body.startPage);
    endPage = Number(body.endPage);
  } else {
    const form = await req.formData();
    key = (form.get('key') as string) || null;
    startPage = Number(form.get('startPage'));
    endPage = Number(form.get('endPage'));
  }
  if (!key || !Number.isFinite(startPage) || !Number.isFinite(endPage)) {
    return NextResponse.json({ error: 'Missing key/startPage/endPage' }, { status: 400 });
  }
  const { data, error } = await supabase.storage.from(PDF_BUCKET).download(key);
  if (error || !data) return NextResponse.json({ error: error?.message ?? 'Download error' }, { status: 400 });

  const src = await PDFDocument.load(await data.arrayBuffer());
  const indices = Array.from({ length: src.getPageCount() }, (_, i) => i).slice(startPage - 1, endPage);
  if (indices.length === 0) return NextResponse.json({ error: 'Empty range' }, { status: 400 });

  const out = await PDFDocument.create();
  const pages = await out.copyPages(src, indices);
  for (const p of pages) out.addPage(p);
  const bytes = await out.save({ useObjectStreams: true });

  const outKey = key.replace(/\.pdf$/i, '') + `.pages_${startPage}-${endPage}.${Date.now()}.pdf`;
  const { error: upErr } = await supabase.storage.from(PDF_BUCKET).upload(outKey, bytes, { contentType: 'application/pdf' });
  if (upErr) return NextResponse.json({ error: upErr.message }, { status: 400 });

  await logAction({ userId: user.id, fileKey: outKey, actionType: 'split', details: { source: key, startPage, endPage } });
  return NextResponse.json({ ok: true, key: outKey });
}

