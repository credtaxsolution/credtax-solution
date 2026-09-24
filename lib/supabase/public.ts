import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Cookie-free client for static site generation (SSG/ISR) and public reads
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
      },
    }
  );
}
