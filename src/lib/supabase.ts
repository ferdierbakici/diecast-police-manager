import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yzvsfzkksmvwaseudkrq.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_L35q3mvxArjsmYMT21pk0w_w0aRhTwo';

export const supabase = createClient(supabaseUrl, supabaseKey);
