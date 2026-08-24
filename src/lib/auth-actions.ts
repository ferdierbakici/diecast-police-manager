'use client';

import { supabase } from '@/lib/supabase';

export async function signInWithPassword(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return { error: error?.message ?? null };
}

export async function signUpWithPassword(
  email: string,
  password: string,
  displayName: string
) {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: displayName || null },
    },
  });
  return { error: error?.message ?? null };
}

export async function signInWithGoogle() {
  // Kullanıcıyı Google'a yönlendirir; dönüşte supabase-js istemcisi
  // (detectSessionInUrl varsayılan olarak açık) oturumu otomatik algılar,
  // ekstra bir /auth/callback sayfasına gerek yok.
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin,
    },
  });
  if (error) {
    return { error: error.message };
  }
  return { error: null };
}

export async function signOut() {
  await supabase.auth.signOut();
}
