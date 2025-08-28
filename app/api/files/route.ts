import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/serverClient';
import { PDF_BUCKET } from '@/lib/constants';

export const runtime = 'nodejs';

export async function GET() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await supabase.storage.from(PDF_BUCKET).list(user.id, { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ files: data ?? [] });
}

