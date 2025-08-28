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
  if (contentType.includes('application/json')) {
    const body = await req.json();
    key = body.key;
  } else {
    const form = await req.formData();
    key = (form.get('key') as string) || null;
  }
  if (!key) return NextResponse.json({ error: 'Missing key' }, { status: 400 });

  const { data, error } = await supabase.storage.from(PDF_BUCKET).download(key);
  if (error || !data) return NextResponse.json({ error: error?.message ?? 'Download error' }, { status: 400 });

  const pdfDoc = await PDFDocument.load(await data.arrayBuffer(), { updateMetadata: false });
  // pdf-lib does not provide true compression, but we can resave to reduce metadata
  const bytes = await pdfDoc.save({ useObjectStreams: true });

  const outKey = key.replace(/\.pdf$/i, '') + `.compressed.${Date.now()}.pdf`;
  const { error: upErr } = await supabase.storage.from(PDF_BUCKET).upload(outKey, bytes, { contentType: 'application/pdf' });
  if (upErr) return NextResponse.json({ error: upErr.message }, { status: 400 });

  await logAction({ userId: user.id, fileKey: outKey, actionType: 'compress', details: { source: key } });
  return NextResponse.json({ ok: true, key: outKey });
}

