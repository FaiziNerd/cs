import { createSupabaseServerClient } from '@/lib/supabase/serverClient';
import type { ActionType } from '@/lib/constants';

export async function logAction(params: {
  userId: string;
  fileKey: string;
  actionType: ActionType;
  details?: Record<string, any> | null;
}) {
  const supabase = createSupabaseServerClient();
  await supabase.from('actions_log').insert({
    user_id: params.userId,
    file_key: params.fileKey,
    action_type: params.actionType,
    details: params.details ?? null
  });
}

