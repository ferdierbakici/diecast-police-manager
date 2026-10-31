import { createClient } from "@supabase/supabase-js";

// Sunucu tarafında (sayfa, sitemap) okuma için kullanılır, oturum tutmaz.
// Env değişken adları lib/supabase.ts içinde kullandıklarınızla aynı olmalı.
export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } },
);
