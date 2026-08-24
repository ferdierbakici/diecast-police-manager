import { createBrowserClient } from '@supabase/ssr'

// Bu istemci, 'use client' bileşenlerinde (formlar, butonlar vb.) kullanılır.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    // Not: Eğer Supabase panelinizde henüz sadece eski "anon" key varsa
    // (Settings > API Keys > Legacy API Keys), onu da bu env değişkenine
    // aynen yapıştırabilirsiniz — fonksiyonel olarak birebir aynı çalışır.
  )
}
