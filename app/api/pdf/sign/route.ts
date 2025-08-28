import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/serverClient';
import { PDFDocument, rgb } from 'pdf-lib';
import { PDF_BUCKET } from '@/lib/constants';
import { logAction } from '@/lib/log';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.formData();
  const key = body.get('key') as string | null;
  const pageIndex = Number(body.get('pageIndex') ?? 0);
  const x = Number(body.get('x') ?? 50);
  const y = Number(body.get('y') ?? 50);
  const width = Number(body.get('width') ?? 150);
  const height = Number(body.get('height') ?? 50);
  const signatureFile = body.get('signature') as File | null;
  if (!key || !signatureFile) return NextResponse.json({ error: 'Missing key/signature' }, { status: 400 });

  const { data, error } = await supabase.storage.from(PDF_BUCKET).download(key);
  if (error || !data) return NextResponse.json({ error: error?.message ?? 'Download error' }, { status: 400 });
  const pdfDoc = await PDFDocument.load(await data.arrayBuffer());

  const sigBytes = await signatureFile.arrayBuffer();
  const mime = signatureFile.type;
  let image;
  if (mime === 'image/png') image = await pdfDoc.embedPng(sigBytes);
  else image = await pdfDoc.embedJpg(sigBytes);

  const page = pdfDoc.getPage(pageIndex) ?? pdfDoc.getPage(0);
  page.drawImage(image, {
    x,
    y,
    width,
    height,
    opacity: 0.95
  });

  const bytes = await pdfDoc.save({ useObjectStreams: true });
  const outKey = key.replace(/\.pdf$/i, '') + `.signed.${Date.now()}.pdf`;
  const { error: upErr } = await supabase.storage.from(PDF_BUCKET).upload(outKey, bytes, { contentType: 'application/pdf' });
  if (upErr) return NextResponse.json({ error: upErr.message }, { status: 400 });

  await logAction({ userId: user.id, fileKey: outKey, actionType: 'sign', details: { source: key } });
  return NextResponse.json({ ok: true, key: outKey });
}

