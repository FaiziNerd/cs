import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/serverClient';
import { PDF_BUCKET } from '@/lib/constants';
import { logAction } from '@/lib/log';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const form = await req.formData();
  const file = form.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  if (file.type !== 'application/pdf') return NextResponse.json({ error: 'Only PDF allowed' }, { status: 400 });

  const arrayBuffer = await file.arrayBuffer();
  const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
  const objectPath = `${user.id}/${fileName}`;

  const { error } = await supabase.storage
    .from(PDF_BUCKET)
    .upload(objectPath, Buffer.from(arrayBuffer), { contentType: 'application/pdf', upsert: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  await logAction({ userId: user.id, fileKey: objectPath, actionType: 'upload', details: { size: file.size } });
  return NextResponse.json({ ok: true, key: objectPath });
}

