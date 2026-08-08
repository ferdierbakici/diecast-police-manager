import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://eojfccviyaambajvlsqu.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_ffun9Q-34eCT-Iuuqyr1pQ_doJa_ZcR';
export const supabase = createClient(supabaseUrl, supabaseKey);