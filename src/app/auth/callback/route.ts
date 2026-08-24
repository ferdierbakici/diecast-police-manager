import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // 'next' parametresi, kullanıcının girişten sonra nereye yönlendirileceğini belirtir
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Bir şeyler ters gitti, hata mesajıyla login'e geri gönder
  return NextResponse.redirect(`${origin}/auth/login?error=Giriş doğrulanamadı`)
}
