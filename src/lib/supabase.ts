import { createClient } from '@supabase/supabase-js';

// Aktif Supabase projesi: eojfccviyaambajvlsqu
// Eski proje (yzvsfzkksmvwaseudkrq) silinmis durumda; artik kullanilmamalidir.
//
// Anahtar okuma onceligi:
//   1) NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY  (yeni Supabase "Publishable key" sistemi)
//   2) NEXT_PUBLIC_SUPABASE_ANON_KEY         (eski "anon key" sistemi, geriye donuk uyum)
// Ikisi de tanimli degilse asagidaki varsayilan kullanilir (public/publishable anahtardir).
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://eojfccviyaambajvlsqu.supabase.co';

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'sb_publishable_ffun9Q-34eCT-Iuuqyr1pQ_doJa_ZcR';

export const supabase = createClient(supabaseUrl, supabaseKey);
